#!/usr/bin/env python3
"""
Backend API Test Suite for Duodata Marketing Site
Tests all 8 scenarios defined in test_result.md
"""

import requests
import sys
from typing import Dict, Any, Optional

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


def test_scenario_1_get_slices(result: TestResult):
    """
    Scenario 1: GET /api/slices returns 200 with >=16 slices,
    each having id/name/status/owner/source/updated_at
    """
    print("\n[Test 1] GET /api/slices (seed + list)")
    try:
        response = requests.get(f"{BASE_URL}/slices", timeout=10)
        
        if response.status_code != 200:
            result.add_fail("GET /api/slices", f"Expected 200, got {response.status_code}")
            return None
        
        slices = response.json()
        
        if not isinstance(slices, list):
            result.add_fail("GET /api/slices", "Response is not a list")
            return None
        
        if len(slices) < 16:
            result.add_fail("GET /api/slices", f"Expected >=16 slices, got {len(slices)}")
            return None
        
        # Check first slice has required fields
        required_fields = ['id', 'name', 'status', 'owner', 'source', 'updated_at']
        if slices:
            first_slice = slices[0]
            missing_fields = [f for f in required_fields if f not in first_slice]
            if missing_fields:
                result.add_fail("GET /api/slices", f"Missing fields: {missing_fields}")
                return None
        
        result.add_pass("GET /api/slices", f"Returned {len(slices)} slices with all required fields")
        return slices
        
    except Exception as e:
        result.add_fail("GET /api/slices", f"Exception: {str(e)}")
        return None


def test_scenario_2_post_slice(result: TestResult):
    """
    Scenario 2: POST /api/slices with specific payload returns 200 with an id
    """
    print("\n[Test 2] POST /api/slices (create)")
    try:
        payload = {
            "name": "Customer Segment",
            "status": "Proposed",
            "tag": "GTM",
            "owner": "QA Bot",
            "source": "Snowflake"
        }
        
        response = requests.post(f"{BASE_URL}/slices", json=payload, timeout=10)
        
        if response.status_code != 200:
            result.add_fail("POST /api/slices", f"Expected 200, got {response.status_code}. Response: {response.text}")
            return None
        
        created_slice = response.json()
        
        if 'id' not in created_slice:
            result.add_fail("POST /api/slices", "Response missing 'id' field")
            return None
        
        # Verify all fields match
        for key, value in payload.items():
            if created_slice.get(key) != value:
                result.add_warning("POST /api/slices", f"Field '{key}' mismatch: expected '{value}', got '{created_slice.get(key)}'")
        
        result.add_pass("POST /api/slices", f"Created slice with id: {created_slice['id']}")
        return created_slice
        
    except Exception as e:
        result.add_fail("POST /api/slices", f"Exception: {str(e)}")
        return None


def test_scenario_3_patch_valid_status(result: TestResult, slice_id: str):
    """
    Scenario 3: PATCH /api/slices/{id} with {status:"Approved"} updates;
    subsequent GET reflects it
    """
    print("\n[Test 3] PATCH /api/slices/{id} (update status to Approved)")
    try:
        # Update status to Approved
        response = requests.patch(f"{BASE_URL}/slices/{slice_id}", json={"status": "Approved"}, timeout=10)
        
        if response.status_code != 200:
            result.add_fail("PATCH /api/slices (valid status)", f"Expected 200, got {response.status_code}")
            return False
        
        updated_slice = response.json()
        
        if updated_slice.get('status') != 'Approved':
            result.add_fail("PATCH /api/slices (valid status)", f"Status not updated. Got: {updated_slice.get('status')}")
            return False
        
        # Verify with GET
        get_response = requests.get(f"{BASE_URL}/slices", timeout=10)
        if get_response.status_code == 200:
            slices = get_response.json()
            found_slice = next((s for s in slices if s['id'] == slice_id), None)
            if found_slice and found_slice.get('status') == 'Approved':
                result.add_pass("PATCH /api/slices (valid status)", "Status updated to Approved and verified")
                return True
            else:
                result.add_fail("PATCH /api/slices (valid status)", "Status not reflected in subsequent GET")
                return False
        else:
            result.add_warning("PATCH /api/slices (valid status)", "Could not verify with GET")
            return True
        
    except Exception as e:
        result.add_fail("PATCH /api/slices (valid status)", f"Exception: {str(e)}")
        return False


def test_scenario_4_patch_invalid_status(result: TestResult, slice_id: str):
    """
    Scenario 4: PATCH with {status:"Bogus"} must NOT change status (silent ignore)
    and must not 500
    """
    print("\n[Test 4] PATCH /api/slices/{id} (invalid status - should be ignored)")
    try:
        # First get current status
        get_response = requests.get(f"{BASE_URL}/slices", timeout=10)
        if get_response.status_code != 200:
            result.add_fail("PATCH /api/slices (invalid status)", "Could not get current status")
            return False
        
        slices = get_response.json()
        current_slice = next((s for s in slices if s['id'] == slice_id), None)
        if not current_slice:
            result.add_fail("PATCH /api/slices (invalid status)", "Slice not found")
            return False
        
        current_status = current_slice.get('status')
        
        # Try to update with invalid status
        response = requests.patch(f"{BASE_URL}/slices/{slice_id}", json={"status": "Bogus"}, timeout=10)
        
        # Must not return 500
        if response.status_code >= 500:
            result.add_fail("PATCH /api/slices (invalid status)", f"Got 500 error: {response.status_code}")
            return False
        
        if response.status_code != 200:
            result.add_fail("PATCH /api/slices (invalid status)", f"Expected 200, got {response.status_code}")
            return False
        
        # Verify status unchanged
        get_response2 = requests.get(f"{BASE_URL}/slices", timeout=10)
        if get_response2.status_code == 200:
            slices2 = get_response2.json()
            updated_slice = next((s for s in slices2 if s['id'] == slice_id), None)
            if updated_slice and updated_slice.get('status') == current_status:
                result.add_pass("PATCH /api/slices (invalid status)", f"Invalid status silently ignored, status remains '{current_status}'")
                return True
            else:
                result.add_fail("PATCH /api/slices (invalid status)", f"Status changed from '{current_status}' to '{updated_slice.get('status')}'")
                return False
        else:
            result.add_warning("PATCH /api/slices (invalid status)", "Could not verify status unchanged")
            return True
        
    except Exception as e:
        result.add_fail("PATCH /api/slices (invalid status)", f"Exception: {str(e)}")
        return False


def test_scenario_5_delete_slice(result: TestResult, slice_id: str):
    """
    Scenario 5: DELETE /api/slices/{id} returns {ok:true};
    slice absent from subsequent GET
    """
    print("\n[Test 5] DELETE /api/slices/{id}")
    try:
        response = requests.delete(f"{BASE_URL}/slices/{slice_id}", timeout=10)
        
        if response.status_code != 200:
            result.add_fail("DELETE /api/slices", f"Expected 200, got {response.status_code}")
            return False
        
        response_data = response.json()
        if response_data.get('ok') != True:
            result.add_fail("DELETE /api/slices", f"Expected {{ok: true}}, got {response_data}")
            return False
        
        # Verify slice is absent from GET
        get_response = requests.get(f"{BASE_URL}/slices", timeout=10)
        if get_response.status_code == 200:
            slices = get_response.json()
            found_slice = next((s for s in slices if s['id'] == slice_id), None)
            if found_slice:
                result.add_fail("DELETE /api/slices", "Slice still present after deletion")
                return False
            else:
                result.add_pass("DELETE /api/slices", "Slice deleted and absent from subsequent GET")
                return True
        else:
            result.add_warning("DELETE /api/slices", "Could not verify deletion with GET")
            return True
        
    except Exception as e:
        result.add_fail("DELETE /api/slices", f"Exception: {str(e)}")
        return False


def test_scenario_6_post_demo_request_valid(result: TestResult):
    """
    Scenario 6: POST /api/demo-requests with valid payload returns 200
    with id + created_at
    """
    print("\n[Test 6] POST /api/demo-requests (valid email)")
    try:
        payload = {
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "company": "Acme Corp",
            "role": "Data Engineer",
            "company_size": "50-200",
            "use_case": "Data lineage tracking",
            "message": "Interested in a demo"
        }
        
        response = requests.post(f"{BASE_URL}/demo-requests", json=payload, timeout=10)
        
        if response.status_code != 200:
            result.add_fail("POST /api/demo-requests (valid)", f"Expected 200, got {response.status_code}. Response: {response.text}")
            return None
        
        demo_request = response.json()
        
        if 'id' not in demo_request:
            result.add_fail("POST /api/demo-requests (valid)", "Response missing 'id' field")
            return None
        
        if 'created_at' not in demo_request:
            result.add_fail("POST /api/demo-requests (valid)", "Response missing 'created_at' field")
            return None
        
        result.add_pass("POST /api/demo-requests (valid)", f"Created demo request with id: {demo_request['id']}")
        return demo_request
        
    except Exception as e:
        result.add_fail("POST /api/demo-requests (valid)", f"Exception: {str(e)}")
        return None


def test_scenario_7_post_demo_request_invalid_email(result: TestResult):
    """
    Scenario 7: POST /api/demo-requests with invalid email returns 422
    """
    print("\n[Test 7] POST /api/demo-requests (invalid email)")
    try:
        payload = {
            "name": "Bob Smith",
            "email": "not-a-valid-email",
            "company": "Test Corp"
        }
        
        response = requests.post(f"{BASE_URL}/demo-requests", json=payload, timeout=10)
        
        if response.status_code == 422:
            result.add_pass("POST /api/demo-requests (invalid email)", "Correctly returned 422 for invalid email")
            return True
        else:
            result.add_fail("POST /api/demo-requests (invalid email)", f"Expected 422, got {response.status_code}")
            return False
        
    except Exception as e:
        result.add_fail("POST /api/demo-requests (invalid email)", f"Exception: {str(e)}")
        return False


def test_scenario_8_get_demo_requests(result: TestResult, expected_email: str):
    """
    Scenario 8: GET /api/demo-requests contains the just-created demo request
    """
    print("\n[Test 8] GET /api/demo-requests (list)")
    try:
        response = requests.get(f"{BASE_URL}/demo-requests", timeout=10)
        
        if response.status_code != 200:
            result.add_fail("GET /api/demo-requests", f"Expected 200, got {response.status_code}")
            return False
        
        demo_requests = response.json()
        
        if not isinstance(demo_requests, list):
            result.add_fail("GET /api/demo-requests", "Response is not a list")
            return False
        
        # Find the demo request we just created
        found = any(dr.get('email') == expected_email for dr in demo_requests)
        
        if found:
            result.add_pass("GET /api/demo-requests", f"Found demo request with email: {expected_email}")
            return True
        else:
            result.add_fail("GET /api/demo-requests", f"Demo request with email {expected_email} not found")
            return False
        
    except Exception as e:
        result.add_fail("GET /api/demo-requests", f"Exception: {str(e)}")
        return False


def main():
    print("="*80)
    print("DUODATA BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    result = TestResult()
    
    # Test 1: GET /api/slices
    slices = test_scenario_1_get_slices(result)
    
    # Test 2: POST /api/slices
    created_slice = test_scenario_2_post_slice(result)
    
    if created_slice and 'id' in created_slice:
        slice_id = created_slice['id']
        
        # Test 3: PATCH with valid status
        test_scenario_3_patch_valid_status(result, slice_id)
        
        # Test 4: PATCH with invalid status
        test_scenario_4_patch_invalid_status(result, slice_id)
        
        # Test 5: DELETE slice
        test_scenario_5_delete_slice(result, slice_id)
    else:
        result.add_fail("Tests 3-5", "Skipped due to failed POST /api/slices")
    
    # Test 6: POST /api/demo-requests with valid email
    demo_request = test_scenario_6_post_demo_request_valid(result)
    
    # Test 7: POST /api/demo-requests with invalid email
    test_scenario_7_post_demo_request_invalid_email(result)
    
    # Test 8: GET /api/demo-requests
    if demo_request and 'email' in demo_request:
        test_scenario_8_get_demo_requests(result, demo_request['email'])
    else:
        result.add_fail("Test 8", "Skipped due to failed POST /api/demo-requests")
    
    # Print summary
    success = result.print_summary()
    
    return 0 if success else 1


if __name__ == "__main__":
    sys.exit(main())
