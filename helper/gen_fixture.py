import json

data = []
for i in range(1, 300001):
  id_str = f"{i:06d}"
  data.append({"model": "members.MemberCardNo", "fields": {"cardnumber": id_str}})

with open("initial_no.json", "w") as f:
  json.dump(data, f, indent=2)
