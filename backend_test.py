#!/usr/bin/env python3
"""
Backend API Test Suite for Duodata Marketing Site
Tests new history tracking features + bulk import + regression tests
"""

import requests
import sys
from typing import Dict, Any, Optional, List

# Base URL from frontend/.env
BASE_URL = "https://duodata-metrics.preview.emergentagent.com/api"

class TestResult:
    def __init__(self):
        self.passed = []
        self.failed = []
        self.warnings = []
    
    def add_pass(self, test_name: str, details: str = ""):
        self.passed.append(f"✅ {test_name}: {details}")
    
    def add_fail(self, test_name: str, details: str):
        self.failed.append(f"❌ {test_name}: {details}")
    
    def add_warning(self, test_name: str, details: str):
        self.warnings.append(f"⚠️  {test_name}: {details}")
    
    def print_summary(self):
        print("\n" + "="*80)
        print("TEST SUMMARY")
        print("="*80)
        
        if self.failed:
            print("\n🔴 FAILED TESTS:")
            for fail in self.failed:
                print(f"  {fail}")
        
        if self.warnings:
            print("\n🟡 WARNINGS:")
            for warn in self.warnings:
                print(f"  {warn}")
        
        if self.passed:
            print("\n🟢 PASSED TESTS:")
            for pass_test in self.passed:
                print(f"  {pass_test}")
        
        print("\n" + "="*80)
        print(f"Total: {len(self.passed)} passed, {len(self.failed)} failed, {len(self.warnings)} warnings")
        print("="*80 + "\n")
        
        return len(self.failed) == 0


# ============================================================================
# NEW TESTS: History Tracking & Bulk Import
# ============================================================================

def test_bulk_import(result: TestResult):
    """
    NEW Test: POST /api/slices/bulk with specific payload
    Expected: {"created": 2, "skipped": 1}
    """
    print("\n[NEW Test 1] POST /api/slices/bulk (bulk import)")
    try:
        payload = {
            "items": [
                {"name": "Bulk Metric A", "status": "Approved", "source": "Snowflake", "owner": "Bulk QA"},
                {"name": "Bulk Metric B", "source": "dbt"},
                {"name": "", "status": "Proposed"}
            ],
            "default_status": "Proposed"
        }
        
        response = requests.post(f"{BASE_URL}/slices/bulk", json=payload, timeout=10)
        
        if response.status_code != 200:
            result.add_fail("POST /api/slices/bulk", f"Expected 200, got {response.status_code}. Response: {response.text}")
            return None
        
        bulk_result = response.json()
        
        # Check response structure
        if 'created' not in bulk_result or 'skipped' not in bulk_result:
            result.add_fail("POST /api/slices/bulk", f"Missing 'created' or 'skipped' in response: {bulk_result}")
            return None
        
        # Verify counts
        if bulk_result['created'] != 2:
            result.add_fail("POST /api/slices/bulk", f"Expected created=2, got {bulk_result['created']}")
            return None
        
        if bulk_result['skipped'] != 1:
            result.add_fail("POST /api/slices/bulk", f"Expected skipped=1, got {bulk_result['skipped']}")
            return None
        
        # Verify the slices are in the database
        get_response = requests.get(f"{BASE_URL}/slices", timeout=10)
        if get_response.status_code == 200:
            slices = get_response.json()
            bulk_a = next((s for s in slices if s['name'] == 'Bulk Metric A'), None)
            bulk_b = next((s for s in slices if s['name'] == 'Bulk Metric B'), None)
            
            if not bulk_a:
                result.add_fail("POST /api/slices/bulk", "Bulk Metric A not found in GET /api/slices")
                return None
            
            if not bulk_b:
                result.add_fail("POST /api/slices/bulk", "Bulk Metric B not found in GET /api/slices")
                return None
            
            # Verify statuses
            if bulk_a.get('status') != 'Approved':
                result.add_fail("POST /api/slices/bulk", f"Bulk Metric A status should be 'Approved', got '{bulk_a.get('status')}'")
                return None
            
            if bulk_b.get('status') != 'Proposed':
                result.add_fail("POST /api/slices/bulk", f"Bulk Metric B status should be 'Proposed' (default), got '{bulk_b.get('status')}'")
                return None
            
            result.add_pass("POST /api/slices/bulk", f"Created 2 slices, skipped 1. Both slices visible with correct statuses.")
            return {"bulk_a": bulk_a, "bulk_b": bulk_b}
        else:
            result.add_warning("POST /api/slices/bulk", "Could not verify slices with GET")
            return None
        
    except Exception as e:
        result.add_fail("POST /api/slices/bulk", f"Exception: {str(e)}")
        return None


def test_post_slice_with_history(result: TestResult):
    """
    NEW Test: POST /api/slices should return slice with history array
    containing entry with action="created"
    """
    print("\n[NEW Test 2] POST /api/slices returns history with action='created'")
    try:
        payload = {
            "name": "History Test Slice",
            "status": "Proposed",
            "owner": "History QA",
            "source": "BigQuery"
        }
        
        response = requests.post(f"{BASE_URL}/slices", json=payload, timeout=10)
        
        if response.status_code != 200:
            result.add_fail("POST /api/slices (history)", f"Expected 200, got {response.status_code}. Response: {response.text}")
            return None
        
        created_slice = response.json()
        
        # Check for history field
        if 'history' not in created_slice:
            result.add_fail("POST /api/slices (history)", "Response missing 'history' field")
            return None
        
        history = created_slice['history']
        
        if not isinstance(history, list):
            result.add_fail("POST /api/slices (history)", f"'history' should be a list, got {type(history)}")
            return None
        
        if len(history) == 0:
            result.add_fail("POST /api/slices (history)", "'history' array is empty")
            return None
        
        # Check for action="created" entry
        created_entry = next((h for h in history if h.get('action') == 'created'), None)
        
        if not created_entry:
            result.add_fail("POST /api/slices (history)", f"No history entry with action='created'. History: {history}")
            return None
        
        # Verify entry has required fields
        required_fields = ['action', 'by', 'at', 'details']
        missing_fields = [f for f in required_fields if f not in created_entry]
        if missing_fields:
            result.add_fail("POST /api/slices (history)", f"History entry missing fields: {missing_fields}")
            return None
        
        result.add_pass("POST /api/slices (history)", f"Slice created with history entry: action='created', by='{created_entry['by']}', details='{created_entry['details']}'")
        return created_slice
        
    except Exception as e:
        result.add_fail("POST /api/slices (history)", f"Exception: {str(e)}")
        return None


def test_patch_slice_history_tracking(result: TestResult, slice_id: str):
    """
    NEW Test: PATCH /api/slices/{id} with {"status":"Approved"} should append
    history entry with action="updated_status" and include details
    """
    print("\n[NEW Test 3] PATCH /api/slices/{id} appends history with action='updated_status'")
    try:
        # First, get the current slice to see existing history
        get_response = requests.get(f"{BASE_URL}/slices", timeout=10)
        if get_response.status_code != 200:
            result.add_fail("PATCH /api/slices (history)", "Could not get current slice")
            return False
        
        slices = get_response.json()
        current_slice = next((s for s in slices if s['id'] == slice_id), None)
        if not current_slice:
            result.add_fail("PATCH /api/slices (history)", "Slice not found")
            return False
        
        initial_history_count = len(current_slice.get('history', []))
        
        # Update status to Approved
        response = requests.patch(f"{BASE_URL}/slices/{slice_id}", json={"status": "Approved"}, timeout=10)
        
        if response.status_code != 200:
            result.add_fail("PATCH /api/slices (history)", f"Expected 200, got {response.status_code}")
            return False
        
        updated_slice = response.json()
        
        # Check history field exists
        if 'history' not in updated_slice:
            result.add_fail("PATCH /api/slices (history)", "Response missing 'history' field")
            return False
        
        history = updated_slice['history']
        
        if not isinstance(history, list):
            result.add_fail("PATCH /api/slices (history)", f"'history' should be a list, got {type(history)}")
            return False
        
        # Check that history has grown
        if len(history) <= initial_history_count:
            result.add_fail("PATCH /api/slices (history)", f"History count did not increase. Before: {initial_history_count}, After: {len(history)}")
            return False
        
        # Check for action="updated_status" entry
        updated_status_entry = next((h for h in history if h.get('action') == 'updated_status'), None)
        
        if not updated_status_entry:
            result.add_fail("PATCH /api/slices (history)", f"No history entry with action='updated_status'. History: {history}")
            return False
        
        # Verify entry has required fields
        required_fields = ['action', 'by', 'at', 'details']
        missing_fields = [f for f in required_fields if f not in updated_status_entry]
        if missing_fields:
            result.add_fail("PATCH /api/slices (history)", f"History entry missing fields: {missing_fields}")
            return False
        
        # Verify details includes the transition
        details = updated_status_entry.get('details', '')
        if 'status:' not in details.lower() or '→' not in details:
            result.add_fail("PATCH /api/slices (history)", f"History details should include status transition. Got: '{details}'")
            return False
        
        result.add_pass("PATCH /api/slices (history)", f"History appended with action='updated_status', details='{details}'")
        return True
        
    except Exception as e:
        result.add_fail("PATCH /api/slices (history)", f"Exception: {str(e)}")
        return False


# ============================================================================
# REGRESSION TESTS: Existing functionality
# ============================================================================

def test_regression_get_slices(result: TestResult):
    """
    Regression: GET /api/slices returns 200 with slices
    """
    print("\n[Regression 1] GET /api/slices")
    try:
        response = requests.get(f"{BASE_URL}/slices", timeout=10)
        
        if response.status_code != 200:
            result.add_fail("Regression: GET /api/slices", f"Expected 200, got {response.status_code}")
            return None
        
        slices = response.json()
        
        if not isinstance(slices, list):
            result.add_fail("Regression: GET /api/slices", "Response is not a list")
            return None
        
        # Should have at least the default 16 slices
        if len(slices) < 16:
            result.add_fail("Regression: GET /api/slices", f"Expected >=16 slices, got {len(slices)}")
            return None
        
        result.add_pass("Regression: GET /api/slices", f"Returned {len(slices)} slices")
        return slices
        
    except Exception as e:
        result.add_fail("Regression: GET /api/slices", f"Exception: {str(e)}")
        return None


def test_regression_delete_slice(result: TestResult, slice_id: str):
    """
    Regression: DELETE /api/slices/{id} returns {ok:true}
    """
    print("\n[Regression 2] DELETE /api/slices/{id}")
    try:
        response = requests.delete(f"{BASE_URL}/slices/{slice_id}", timeout=10)
        
        if response.status_code != 200:
            result.add_fail("Regression: DELETE /api/slices", f"Expected 200, got {response.status_code}")
            return False
        
        response_data = response.json()
        if response_data.get('ok') != True:
            result.add_fail("Regression: DELETE /api/slices", f"Expected {{ok: true}}, got {response_data}")
            return False
        
        result.add_pass("Regression: DELETE /api/slices", "Slice deleted successfully")
        return True
        
    except Exception as e:
        result.add_fail("Regression: DELETE /api/slices", f"Exception: {str(e)}")
        return False


def test_regression_post_demo_request(result: TestResult):
    """
    Regression: POST /api/demo-requests with valid payload
    """
    print("\n[Regression 3] POST /api/demo-requests")
    try:
        payload = {
            "name": "Regression Test User",
            "email": "regression.test@example.com",
            "company": "Test Corp"
        }
        
        response = requests.post(f"{BASE_URL}/demo-requests", json=payload, timeout=10)
        
        if response.status_code != 200:
            result.add_fail("Regression: POST /api/demo-requests", f"Expected 200, got {response.status_code}. Response: {response.text}")
            return None
        
        demo_request = response.json()
        
        if 'id' not in demo_request:
            result.add_fail("Regression: POST /api/demo-requests", "Response missing 'id' field")
            return None
        
        result.add_pass("Regression: POST /api/demo-requests", f"Created demo request with id: {demo_request['id']}")
        return demo_request
        
    except Exception as e:
        result.add_fail("Regression: POST /api/demo-requests", f"Exception: {str(e)}")
        return None


def test_regression_get_demo_requests(result: TestResult):
    """
    Regression: GET /api/demo-requests returns list
    """
    print("\n[Regression 4] GET /api/demo-requests")
    try:
        response = requests.get(f"{BASE_URL}/demo-requests", timeout=10)
        
        if response.status_code != 200:
            result.add_fail("Regression: GET /api/demo-requests", f"Expected 200, got {response.status_code}")
            return False
        
        demo_requests = response.json()
        
        if not isinstance(demo_requests, list):
            result.add_fail("Regression: GET /api/demo-requests", "Response is not a list")
            return False
        
        result.add_pass("Regression: GET /api/demo-requests", f"Returned {len(demo_requests)} demo requests")
        return True
        
    except Exception as e:
        result.add_fail("Regression: GET /api/demo-requests", f"Exception: {str(e)}")
        return False


def main():
    print("="*80)
    print("DUODATA BACKEND API TEST SUITE - NEW FEATURES + REGRESSION")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    result = TestResult()
    
    # ========================================================================
    # NEW FEATURE TESTS
    # ========================================================================
    print("\n" + "="*80)
    print("NEW FEATURE TESTS: History Tracking & Bulk Import")
    print("="*80)
    
    # Test 1: Bulk import
    bulk_slices = test_bulk_import(result)
    
    # Test 2: POST /api/slices with history
    slice_with_history = test_post_slice_with_history(result)
    
    # Test 3: PATCH /api/slices history tracking
    if slice_with_history and 'id' in slice_with_history:
        test_patch_slice_history_tracking(result, slice_with_history['id'])
    else:
        result.add_fail("PATCH history test", "Skipped due to failed POST /api/slices")
    
    # ========================================================================
    # REGRESSION TESTS
    # ========================================================================
    print("\n" + "="*80)
    print("REGRESSION TESTS: Existing Functionality")
    print("="*80)
    
    # Regression 1: GET /api/slices
    test_regression_get_slices(result)
    
    # Regression 2: DELETE /api/slices (clean up the slice we created)
    if slice_with_history and 'id' in slice_with_history:
        test_regression_delete_slice(result, slice_with_history['id'])
    
    # Regression 3: POST /api/demo-requests
    test_regression_post_demo_request(result)
    
    # Regression 4: GET /api/demo-requests
    test_regression_get_demo_requests(result)
    
    # Print summary
    success = result.print_summary()
    
    return 0 if success else 1


if __name__ == "__main__":
    sys.exit(main())
