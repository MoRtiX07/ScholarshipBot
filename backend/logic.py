import json

def load_data():
    with open("../data/central.json", "r", encoding="utf-8") as f:
        central = json.load(f)
    with open("../data/uttarakhand.json", "r", encoding="utf-8") as f:
        uttarakhand = json.load(f)
    return central + uttarakhand


def check_eligibility(user):
    scholarships = load_data()
    results = []

    for s in scholarships:

        # ✅ FILTER BY CATEGORY (IMPORTANT FIX)
        if user["category"] != s["category"]:
            continue

        status = "Eligible"
        reason = ""

        # Income check
        if user["income"] > s["income_limit"]:
            status = "Not Eligible"
            reason = "Income exceeds limit"

        # Marks check
        elif user["marks"] < s["min_marks"]:
            status = "Not Eligible"
            reason = "Marks below requirement"

        if status == "Eligible":
            results.append({
                "name": s["name"],
                "authority": s["authority"],
                "amount": s["amount"],
                "deadline": s["deadline"],
                "documents": s["documents"],
                 "apply_link": s.get("apply_link", ""),  # ✅ guaranteed
                "status": "Eligible"
            })
        else:
            results.append({
                "name": s["name"],
                "status": "Not Eligible",
                "reason": reason
            })

    return results
