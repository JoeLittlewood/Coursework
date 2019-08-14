# import required packages
import tkinter as tk
import mysql.connector as my
from tkinter import messagebox
from functools import partial

# declare the App class
class App(tk.Frame):

    # declare the constructor method
    def __init__(self, master):
    
        # create and display the top-level frame
        tk.Frame.__init__(self, master)
        self.pack(expand=tk.Y, fill=tk.BOTH)
        
        # set the title and position of the window
        self.master.title("List query")
        x = (self.master.winfo_screenwidth() - self.master.winfo_reqwidth()) // 2
        y = (self.master.winfo_screenheight() - self.master.winfo_reqheight()) // 3
        self.master.geometry("600x400+{}+{}".format(x,y))

        # add a frame to contain the button
        self.buttonFrame = tk.Frame(self, width=200)
        self.buttonFrame.pack(padx=20, pady=15, fill=tk.Y)

        # add a frame to contain the query results
        self.resultsFrame = tk.Frame(self, width=200)
        self.resultsFrame.pack(padx=20, pady=15, expand=tk.YES, fill=tk.X)
        
        tk.Button(self.buttonFrame, text="Query", command=partial(self.testButton, self.resultsFrame)).pack()

        conn = my.MySQLConnection(user='j', password='password', host='localhost', database='themepark')
        cursor = conn.cursor(dictionary=True)
        query = ("select * from themepark")
        cursor.execute(query)

        # print the column names in a grid inside the results frame
        colnum = 0
        for column in cursor.column_names:
            tk.Label(self.resultsFrame,
                     font='System 12 bold',
                     bd=1,
                     text=column,
                     anchor='w',
                     relief='sunken').grid(row=0, column=colnum, sticky='nsew')
            colnum +=1

        # for each row in the results
        #     print the data in a grid inside the results frame
        rownum=1
        for row in cursor:
            colnum = 0
            for column in cursor.column_names:
                tk.Label(self.resultsFrame,
                         text=row[column],
                         anchor='w',
                         relief='sunken', bd=1).grid(row=rownum, column=colnum, sticky='nsew')
                colnum += 1
            rownum += 1


        cursor.close()
        conn.close()

    def testButton(self, targetFrame):
        targetFrame.config(bg='#ffcc99')
        tk.Label(targetFrame, text="This is the target frame").pack()

# if the script is being run...
if __name__ == "__main__":

    # instantiate the App
    root = tk.Tk()
    app = App(root)
    
    # enter the main display loop
    app.mainloop()
