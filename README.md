\# ScholarshipBot



ScholarshipBot is a web-based application that helps students find suitable scholarships based on their eligibility.  

It analyzes academic, personal, and regional details provided by the user and recommends relevant central and state-level scholarships.



The goal of this project is to make scholarship discovery simple, fast, and accessible for students.



---



\## Features



\- Eligibility-based scholarship recommendations

\- Supports Central and Uttarakhand state scholarships

\- Simple and user-friendly interface

\- Separate frontend and backend structure

\- Rule-based filtering for accurate results

\- Easy to extend for more states and schemes



---



\## Technology Stack



\### Frontend

\- HTML

\- CSS

\- JavaScript



\### Backend

\- Python

\- Flask



\### Data Storage

\- JSON files



\### Version Control

\- Git and GitHub



---



\## Project Structure



```text

ScholarshipBot/

│

├── backend/

│   ├── app.py        # Backend server

│   └── logic.py      # Eligibility checking logic

│

├── frontend/

│   ├── index.html    # User input page

│   ├── result.html   # Result display page

│   ├── script.js     # Frontend logic

│   ├── result.js    # Result handling

│   └── style.css    # Styling

│

├── data/

│   ├── central.json

│   └── uttarakhand.json

│

├── .gitignore

└── README.md

How the System Works:



The user enters required academic and personal details on the frontend.

The frontend sends the user input to the backend.

The backend applies eligibility rules on the scholarship dataset.

Matching scholarships are filtered based on the rules.

The final list of eligible scholarships is displayed to the user.


Installation and Setup:

Prerequisites



Python 3.9 or higher

Git

Any modern web browser

Backend Setup:
cd backend

pip install flask

python app.py

The backend server will start at:

http://127.0.0.1:5000


Author:

Arham Ali

B.Tech Computer Science Engineering

License



This project is developed for academic and educational purposes only.





---



\## ✅ AFTER PASTING (DO THIS)



```powershell

git add README.md

git commit -m "Added complete professional README"

git push

