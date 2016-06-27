//Bill Manager App
//Author: Rahul Luthra
//Last Edited On: 5/9/2015

//Assuming Logined in User Pays all the Bill and By Default myself as a contributor to all bills

var BillManager = function (uname, uemail, uphone) {

    var friends = [];

    var bills = [];

    //Friend Class
    var friend = function (name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.bills = [];
    };

    //Bill Class
    var bill = function (expenseDetails, amount) {
        this.expenseDetails = expenseDetails;
        this.amount = amount;
        this.contributors = [];
    };

    //Properties and Operations Returned
    return {
        username: uname,
        email: uemail,
        phone: uphone,
        bills: bills,
        friends: friends,
        addFriend: function (name, email, phone) {
            friends.push(new friend(name, email, phone));
        },
        editFriend: function (oldFriend, newFriend) {
            oldFriend.name = newFriend.name;
            oldFriend.email = newFriend.email;
            oldFriend.phone = newFriend.phone;
        },
        deleteFriend: function (friend) {
            for (var b in friend.bills) {

                var index = friend.bills[b].contributors.indexOf(friend);
                friend.bills[b].contributors.splice(index, 1);
            }

            var index = friends.indexOf(friend);
            friends.splice(index, 1);
        },
        addBill: function (friends, expense, amount) {
            var bill1 = new bill(expense, amount);
            bills.push(bill1);
            for (var f in friends) {
                friends[f].bills.push(bill1);
                bill1.contributors.push(friends[f]);
            }
        },
        editBill: function (oldBill, newBill) {
            oldBill.expenseDetails = newBill.expenseDetails;
            oldBill.amount = newBill.amount;
            //Check Diffrence if new friends added or deleted
            var diff = newBill.contributors.filter(function (x) {
                return oldBill.contributors.indexOf(x) < 0
            });
            if (diff.length > 0) {
                for (var nf in diff) {
                    diff[nf].bills.push(newBill);
                }
            }

            diff = oldBill.contributors.filter(function (x) {
                return newBill.contributors.indexOf(x) < 0
            });
            if (diff.length > 0) {
                for (var nf in diff) {
                    var index = diff[nf].bills.indexOf(oldBill);
                    diff[nf].bills.splice(index, 1);
                }
            }
            oldBill.contributors = newBill.contributors;
        },
        deleteBill: function (bill) {

            for (var c in bill.contributors) {
                var index = bill.contributors[c].bills.indexOf(bill);
                bill.contributors[c].bills.splice(index, 1);
            }

            var index = bills.indexOf(bill);
            bills.splice(index, 1);
        },
        getFriends: function () {
            for (var f in friends) {
                friends[f]['owes'] = 0;
                for (var b in friends[f].bills) {
                    friends[f]['owes'] = +((friends[f]['owes'] + (friends[f].bills[b].amount / (friends[f].bills[b].contributors.length + 1))).toFixed(2));
                }
            }
            return friends;
        },
        getBills: function () {
            for (var b in bills) {
                var piece = (bills[b].amount / (bills[b].contributors.length + 1)).toFixed(2);
                bills[b]['owed'] = (bills[b].contributors.length * piece).toFixed(2);
            }
            return bills;
        }
    }
}('Rahul Luthra', 'rahulluthra90@gmail.com', '9718871144');