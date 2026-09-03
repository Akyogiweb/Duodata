# Hypotheses

## H1: This repo is a sales/demo shell, not the core product
**Evidence for:** Marketing-heavy frontend, mock case studies, single CRUD domain (slices), Emergent platform artifacts  
**Evidence against:** Substantial Explore page UX, history tracking, bulk import — more than a static landing  
**Confidence:** HIGH  
**Disconfirm:** Find links to separate product repo or auth-gated app

## H2: Slice seed data reflects real PE metric ontology vocabulary
**Evidence for:** Specific tags (ILPA, SFDR, ASC 820, Covenant Compliance), named owners  
**Evidence against:** Generic names could be fabricated for demo realism  
**Confidence:** MEDIUM

## H3: Hero label sync bug is a 50ms transition duration mismatch
**Evidence for:** test_result.md root cause analysis (650ms card vs 700ms label exit)  
**Evidence against:** Could also be React batching / phase timing logic  
**Confidence:** HIGH  
**Verify:** Align transition durations in `Hero.jsx` and re-poll opacity

## H4: Preview environment was deprovisioned
**Evidence for:** 404 on preview URL during discovery; no finished environment build on Cursor Cloud  
**Evidence against:** Wrong path or temporary outage  
**Confidence:** MEDIUM

## H5: emergentintegrations is vestigial in requirements.txt
**Evidence for:** Not imported anywhere in backend code  
**Evidence against:** Could be used by Emergent runtime hooks not in repo  
**Confidence:** HIGH
