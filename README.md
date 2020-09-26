# TaterBot

## **Welcome to the TaterBot**

### **Prefix**

All commands are initiated with tb!(command).

`tb!command`

### **Adding a user**

Users must be added to the database before you can track data for them.

`tb!adduser @user`

## **Keeping track of debts**

This bot uses two tables to keep track of how much one user owes another (Debts) and how much has been paid between users (Transactions)

### **Debts**

Debts between users can be added using the command below. The first user will always be the 'owing user' and the second with be the 'collecting user'

`tb!adddebt @owing_user @collecting_user amount`

### **Transactions**

Transactions are used to track how much has been paid between users. The first user will always be the 'paying user' and the second will be the 'receiving user'

`tb!transaction @paying_user @receiving_user amount`

### **Balance between users**

To see how much one user owes another use the command below.

`tb!balancebetween @user1 @user2`
