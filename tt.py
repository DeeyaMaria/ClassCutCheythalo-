from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# 1. Define the "origins" (the URL where your frontend is running)
origins = [
    "http://localhost:3000",  # Default for React/Next.js
    "http://127.0.0.1:5500",  # Default for VS Code Live Server
]

# 2. Add the middleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

#timetable for s4
s4 = {
    "monday": [ "OS LAB", "OS LAB", "OS LAB", "ECONOMICS", "HONOURS", "HONOURS"],
    "tuesday": [ "MATHS", "OS", "SE", "DBMS", "DBMS", "CAO"],
    "wednesday": [ "ECONOMICS", "OS", "MATHS", "CAO","HONOURS", "HONOURS"],
    "thursday": [ "DBMS LAB", "DBMS LAB", "DBMS LAB", "OS", "MATHS", "OS"],
    "friday": [ "CAO", "CAO", "SE", "DBMS", "DBMS", "SE"]
}

def getdaytt(day):
    return s4[day]
#this works for now
#import calendar thingy
#print(getdaytt("monday"))


#subject details
subjects = {
    "OS LAB": {
        "classpresent": 9,
        "classabsent": 3,
        "totalclass": 12
    },
    "ECONOMICS": {
        "classpresent": 9,
        "classabsent": 3,
        "totalclass": 12
    },  
    "HONOURS": {
        "classpresent": 9,
        "classabsent": 3,
        "totalclass": 12
    },  
    "MATHS": {
        "classpresent": 80,
        "classabsent": 20,
        "totalclass": 100
    },
    "OS": {
        "classpresent": 10,
        "classabsent": 2,
        "totalclass": 12
    },
    "SE": {
        "classpresent": 9,
        "classabsent": 3,
        "totalclass": 12
    },  
    "DBMS": {
        "classpresent": 4,
        "classabsent": 8,
        "totalclass": 12
    },
    "CAO": {
        "classpresent": 10,
        "classabsent": 2,
        "totalclass": 12
    },
    "DBMS LAB": {
        "classpresent": 11, 
        "classabsent": 1,
        "totalclass": 12

    }
}
def getsubdetails(sub):
    return subjects[sub]
#this works for now
#print(getsubdetails("OS LAB"))

#updare attendance
def updateattendance(sub, status):
    if status == "present":
        subjects[sub]["classpresent"] += 1
    elif status == "absent":
        subjects[sub]["classabsent"] += 1
    subjects[sub]["totalclass"] += 1


#class cut cheyan patto
def cutcheyanpatto(subject):
    details = getsubdetails(subject)
    attendance_percentage = (details["classpresent"] / (details["totalclass"]+1)) * 100
    if attendance_percentage < 75:
        return False
    else:
        return True

#how many classes to attend to reach cut off
def classes_to_attend(subject):
    details = getsubdetails(subject)
    present = details["classpresent"]
    total = details["totalclass"]
    required_percentage = 75

    if (present / total) * 100 >= required_percentage:
        return 0

    classes_needed = 0
    while (present / (total + classes_needed)) * 100 < required_percentage:
        classes_needed += 1
        present += 1
    

    return classes_needed

#classes to skip
def classes_to_skip(subject):
    details = getsubdetails(subject)
    present = details["classpresent"]
    total = details["totalclass"]
    required_percentage = 75

    if (present / total) * 100 < required_percentage:
        return 0

    classes_can_skip = 0
    while (present / (total + classes_can_skip)) * 100 >= required_percentage:
        classes_can_skip += 1

    return classes_can_skip - 1


print(classes_to_attend("DBMS"))
print(classes_to_skip("MATHS"))
print(cutcheyanpatto("DBMS"))



@app.get("/db")
def get_dashboard():
    result = [] # Changed to a list for easier frontend mapping
    for sub_name, details in subjects.items():
        # Calculate current percentage
        present = details["classpresent"]
        total = details["totalclass"]
        
        # Avoid division by zero if totalclass is 0
        percentage = round((present / total) * 100, 2) if total > 0 else 0
        
        # Build the subject object
        result.append({
            "subject": sub_name,
            "percentage": percentage,
            "present": present,
            "total": total,
            "can_cut": cutcheyanpatto(sub_name),
            "classes_to_attend": classes_to_attend(sub_name),
            "classes_to_skip": classes_to_skip(sub_name)
        })
    return result
@app.get("/tt")
def timetable():
    return s4