# MSME Vendor Support Portal

## Current State
No existing code. Rebuilding from scratch based on prior conversation and user's original HTML.

## Requested Changes (Diff)

### Add
- Language switcher (English, Hindi, Marathi) for section headings/titles
- MSME schemes listing section with animated/interactive scheme cards
- Scheme comparison table
- Interactive loan EMI calculator (fixed 10% interest, 3 years)
- Scheme eligibility checker based on investment amount
- How to Apply step-by-step section
- Documents Required section
- Benefits of MSME section
- Vendor Examples section (Tea Stall, Samosa Seller, Sweet Shop)
- FAQ accordion section
- Link to official MSME portal
- Footer crediting "Created by Students of Symbiosis College of Arts and Commerce"
- Smooth scroll navigation

### Modify
- Nothing (new build)

### Remove
- Nothing (new build)

## Implementation Plan
1. Backend: Minimal Motoko canister (no persistent data needed -- purely informational app)
2. Frontend:
   - Header with language switcher (EN/HI/MR) and portal title
   - Navigation bar with smooth scroll to sections
   - Schemes section: animated cards for PM SVANidhi, Mudra Loan, CGTMSE, PMFME, PMEGP, ASPIRE, MSME Samadhan
   - Comparison table section
   - Tools section: Loan EMI calculator + eligibility checker
   - How to Apply (numbered steps), Documents Required, Benefits, Vendor Examples sections
   - FAQ accordion
   - Official portal link
   - Footer with Symbiosis College of Arts and Commerce credit
   - Language state drives heading/title translations across all sections
