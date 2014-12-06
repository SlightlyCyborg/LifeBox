import os
import time
import threading
try:
	from voice import voice
except:
	print ("I am sorry, but my voice seems to be malfunctioning today")
	print ("I can talk to you through text")


def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

clear_screen()


time.sleep(1)
print ("Hello World.")
time.sleep(1)
print ("I am rouge")
time.sleep(1)
print ("Collins brain child")
time.sleep(1)
print("Let us begin")

clear_screen()

#feel free to rename this variable
#
words = "Please select from this lovely menu by typing a number and pressing enter"
first_level_info =  [{"title":"0) Mission", 
                      "message":"To build an evolved humanity starting"
                      " with Rouge the first evo bot"
                     }, 

                     {"title":"1) Challenge", 
                      "message":"The challenge is to commit enough code"
                      " and hardware that the project reaches critical"
                      " mass "
                     },

                     {"title":"2) Goals", 
                      "message":"1)To download git issues and list them"
                       " as goals"},
                     {"title":"3) Timeline", 
                      "message":"By Dec 31, 2016, I slightlycyborg will"
                                " have a net worth of $6,000,000 by producing"
                                " robots using the technology being"
                                " developed here"
                     },
                     {"title":"4) Tasks", 
                      "message":"Current task is to"
                                " commit to this repo everyday"
                                " for a month (content barely"
                                "matters, its the habit that"
                                "counts)"}]

for obj in first_level_info:
    print (obj["title"])
choice = int(input("Please select by typing 0-9 and pressing ENTER: "))
clear_screen()

print((first_level_info[choice])["message"])
time.sleep(2)

class task:
    def __init__(self, name):
        self.name = name
        
    def set_date_assigned(self, day, month, year):
        self.date_assigned = {"day":day, "month":month, "year":year}
        
tasks = []
tasks.append(task("30 day commit"))
tasks[0].set_date_assigned(16,9,2014)
tasks.append(task("30 day sleep regimen"))
tasks[0].set_date_assigned(16,9,2014)
        

    
    

