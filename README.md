# Taskana (To-do App)

## Description
I created this app using Vanilla JS to better understand the fundamentals of coding and to learn the **IIFE Design Pattern**.

## Tech Stacks
- HTML
- CSS
- JavaScript

## Functionality
- This to-do app will allow the user to **submit**, **edit**, **save**, **cancel**, and **delete** a task.
- When user leaves/refreshes the page, tasks will remain as it was using local storage.
- User will be able to submit a task with a due date (or without) which will then count down at **23:59:59** each day from the current date up to the final due date.
- When tasks are added, it will append to the list in the order of the due dates. Upcoming due dates will appear at the top while null dates will appear at the very end.
- When task is complete, the list item will move to the bottom of the list so main view can remain decluttered.
- When task becomes incomplete, the list item will insert itself back into the queue according to due date.
- When user completes a task, the chibi will express compliments to encourage and show gratitude for finishing a task.
- User can filter tasks that are **complete**, **incomplete**, and **all** using the drop down filter.

### Home Page:
!["Home page"](https://github.com/huongw/todo-app-2.0/blob/master/docs/home.jpg?raw=true)

### Edit a task:
!["Edit task"](https://github.com/huongw/todo-app-2.0/blob/master/docs/edit.jpg?raw=true)

### Complete a task:
!["Complete task"](https://github.com/huongw/todo-app-2.0/blob/master/docs/completeTask.jpg?raw=true)