# COMMENTS
This App is using a REST API that I have built using MongoDB for the database. 

This API is currently hosted in a Heroku free tier, which goes to sleep after 1 hour, 
so if it does not work at first please try again as the server might have been waking up.

The App currently offers this features:
    - Navbar using angular router to direct to different pages (I have just added the about page to show I know how to use the router)
    - Expansion panel for the input of new wishes, that changes message when expanded (when collapsed, it says to press to open, when expanded it changes the message to press to close)
    - On page load, the App accesses the API using Angular HTTP Client and retrieves the saved wishes, classifying them by categories in individual cards
    - If a new wish is added with a new category, another category card will be automatically created.
    - user can Add wishes, delete wishes or delete a complete category with the respective buttons/icons.
    - App offers Drag and Drop feature between the different categories. The item can still be deleted once it has been moved to another category. However, the drag drop from one category to another is not currently saved to the database.
    - App is fully responsive and will adapt to different window sizes effectively.
    - Styled using Angular Material.
    
I hope you are happy with this App. If there is anything that you would have liked to be done differntly, I would 
appreciate some feedback so that I can improve my coding in the future.

Thanks,
Javier Farre.