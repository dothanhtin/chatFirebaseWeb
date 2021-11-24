import User, { MessageForward } from './Models/Classes.js';
import { MessageBackward } from './Models/Classes.js';
//import '/js/Models/Classes.js';
//#region init and constant

//#region constant
const zalo = "ZALO";
const facebook = "FACEBOOK";
const livechat = "LIVECHAT";
//#endregion

//#region link and environtment
const prodLink = "https://orimx.vnptit.vn/kong";
const demoLink = "https://orimx-demo.vnptit.vn/kong";
const devLink = "https://orimx-dev.vdc2.com.vn/kong";
//const localLink = "http://localhost:55567";
const localLink = "http://localhost:55567"; //change with local test

//const testPushLink = "https://localhost:5001/";
//#endregion

//#region user login
//Cán bộ tổng đài BPC 1  - code 1
let user1 = new User
    (
        "ea462f1c-e78b-4f59-b968-444f31956ee5",
        "bpc.cbtd1",
        "9dc7196e-bb02-4df6-b703-1cddf5ac2c4a",
        "agent_bpc_1",
        0,
        "Cán bộ tổng đài 1"
    );

//Cán bộ tổng đài BPC 5 - code 5
let user5 = new User
    (
        "b2591422-b5f8-4c9f-9c03-d650be0b18e5",
        "bpc.cbtd_05",
        "9dc7196e-bb02-4df6-b703-1cddf5ac2c4a",
        "agent_bpc_05",
        0,
        "Cán bộ tổng đài 5"
    );
let user10 = new User(
    "00eabf39-ac19-4ac6-aafa-ab0407d30647",
    "tongdai_222.hcm",
    "8d22727e-2fa8-4627-84c5-e2b36bca5d28",
    "Local/222@agents/n",
    0,
    "tongdai_222.hcm"
);

let officerCanGioTest = new User(
    "d1ad9d95-45cd-4e31-ae55-f356bb947ed2",
    "ql.longhoatest",
    "3114f6d8-18c4-49e8-81ea-f34856482b3e",
    null,
    0,
    "Quản lý Long Hòa Test"
)

let user228 = new User(
    "0085deea-4e04-47ea-bdf8-53aa2ae864c1",
    "tongdai_228.hcm",
    "8d22727e-2fa8-4627-84c5-e2b36bca5d28",
    "Local_228",
    0,
    "tongdai_228.hcm"
)

//#endregion

//#region format node
//chat
const _formatRouteMessage = "chat/messages/";       // route thực là "chat/messages/ten_ketnoi/userId  (Tên kết nối gồn Zalo_Uid_UserId) // Uid là id của người gửi từ app tới
const _formatRouteConnection = "chat/connection/";  // route thực là "chat/connection/userId
const _formatRouteLogin = "chat/login/";            // route thực là "chat/login/userId
const _formatRouteTemporaryConnection = "chat/tempconnection/";
const _prefixTempConnectionWithUserLogin = "tempconnection";
const _prefixInfoWithUserLogin = "info";
const _prefixCallCenterBusy = "callCenterBusy";

//chat offline

//Đọc badge để hiển thị có tin nhắn mới
//Khi click vào thì call route xóa
const _formatRouteNotiNewChat = "chat/notificationNewChat/";

//Sử dụng cho luồng xóa kết nối
const _formatRouteTempDeleteConnectionOfflineNotUse = "chat/deleteTempOfflineConnectionNotUse/";
const _prefixConnectionToDelete = "deleteConnection";

//call
const _prefixCallInfo = "call";

//notification
const _formatRouteNotification = "notification/";
const _prefixListenNotification = "listen";
const _prefixActionNotification = "action";
const _prefixStatusNotification = "active";
//#endregion

//#region config of Firebase
var firebaseConfig = {
    apiKey: "AIzaSyB4mzTxAplsmC37imEUy0yUQKDQEpKQNoE",
    authDomain: "web-push-1-2013d.firebaseapp.com",
    databaseURL: "https://web-push-1-2013d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "web-push-1-2013d",
    storageBucket: "web-push-1-2013d.appspot.com",
    messagingSenderId: "907300725649",
    appId: "1:907300725649:web:a4cff1adf1481736cf7030",
    measurementId: "G-N83228LKL9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

//#endregion

//#endregion

//#region old proccessing with firebase db realtime
// get user's data
//const username = prompt("Please Tell Us Your Name");
// submit form
// listen for submit event on the form and call the postChat function
//document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
//function sendMessage(e) {
//    //e.preventDefault();

//    // get values to be submitted
//    //const timestamp = Date.now();
//    //const messageInput = document.getElementById("message-input");
//    //const message = messageInput.value;

//    // clear the input box
//    //messageInput.value = "";

//    //auto scroll to bottom
//    //document
//    //    .getElementById("messages")
//    //    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

//    // create db collection and send in the data
//    //db.ref("messages/" + timestamp).set({
//    //    username,
//    //    message,
//    //});
//}

// display the messages
// reference the collection created earlier
//const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
//fetchChat.on("child_added", function (snapshot) {
//    console.log(snapshot);
//    console.log(snapshot.key);
//    console.log(snapshot.val());
//    const messages = snapshot.val();
//    const message = `<li class=${username === messages.username ? "sent" : "receive"
//        }><span>${messages.username}: </span>${messages.message}</li>`;
//    // append the message on the page
//    document.getElementById("messages").innerHTML += message;
//});
//#endregion

//#region new proccessing with chat
//Choose user login
let chooseUser;
let connectionWithUserId;
let messageRoute;
let connectionId = "";//lấy từ việc chọn 1 kết nối từ khung list kết nối
var dictConnections = new Map();
var dictTempConnections = [];
let usercode = prompt("Please Tell Us Your Code");
if (usercode === "1") {
    chooseUser = user1;
    login();
    connectionWithUserId = _formatRouteConnection + chooseUser.userId + "/";
    let fetchConnection = db.ref(connectionWithUserId);

    fetchConnection.on("child_added", function (snapshot) {
        //console.log(snapshot);
        //console.log(snapshot.val());
        let item = snapshot.val();
        //check exist in list
        var check = dictConnections.get(item.connectionId);
        if (typeof (check) === "undefined" || check == null) {
            dictConnections.set(item.connectionId, item);
        }
        else
            $(`#${item.connectionId}`).remove();
        let eli = `<li id=${item.connectionId} class="list-group-item"
                    style="background-image: url('${item.avatar}');background-repeat: no-repeat;background-size: contain;text-align:center">
                    ${item.username}(${item.typeChat})<span class=${item.badge > 0 ? "badge" : "badgeHidden"} style="float: right;color:red">${item.badge}</span>
                    <span id='close'>x</span></li>`;
        $('#lst_conn').append(eli);
    });

    //fetch tempConnection
    let fetchTempConnection = db.ref(`${_formatRouteLogin}${chooseUser.userId}/${_prefixTempConnectionWithUserLogin}`)
    fetchTempConnection.on("child_added", function (snapshot) {
        let item = snapshot.key;
        if (typeof (item) !== "undefined" && item !== null) {
            if (typeof dictTempConnections[item] === 'undefined') {
                dictTempConnections.push(item);
            }
        }
    });
    //fetch busy call center
    initFetchCallCenterInfo(chooseUser.configNumber);
    //fetch listen notification
    initListenNotification(chooseUser.departmentId, chooseUser.userId);
}
else if (usercode === "10") {
    chooseUser = user10;
    login();
    connectionWithUserId = _formatRouteConnection + chooseUser.userId + "/";
    let fetchConnection = db.ref(connectionWithUserId);

    fetchConnection.on("child_added", function (snapshot) {
        //console.log(snapshot);
        //console.log(snapshot.val());
        let item = snapshot.val();
        //check exist in list
        var check = dictConnections.get(item.connectionId);
        if (typeof (check) === "undefined" || check == null) {
            dictConnections.set(item.connectionId, item);
        }
        else
            $(`#${item.connectionId}`).remove();
        let eli = `<li id=${item.connectionId} class="list-group-item"
                    style="background-image: url('${item.avatar}');background-repeat: no-repeat;background-size: contain;text-align:center">
                    ${item.username}(${item.typeChat})<span class=${item.badge > 0 ? "badge" : "badgeHidden"} style="float: right;color:red">${item.badge}</span>
                    <span id='close'>x</span></li>`;
        $('#lst_conn').append(eli);
    });

    //fetch tempConnection
    let fetchTempConnection = db.ref(`${_formatRouteLogin}${chooseUser.userId}/${_prefixTempConnectionWithUserLogin}`)
    fetchTempConnection.on("child_added", function (snapshot) {
        let item = snapshot.key;
        if (typeof (item) !== "undefined" && item !== null) {
            if (typeof dictTempConnections[item] === 'undefined') {
                dictTempConnections.push(item);
            }
        }
    });
    //fetch busy call center
    initFetchCallCenterInfo(chooseUser.configNumber);
    //fetch listen notification
    initListenNotification(chooseUser.departmentId, chooseUser.userId);
}
else if (usercode === "20") {
    chooseUser = officerCanGioTest;
    //fetch listen notification
    initListenNotification(chooseUser.departmentId, chooseUser.userId);
}
else if (usercode === "228") {
    chooseUser = user228;
    login();
    connectionWithUserId = _formatRouteConnection + chooseUser.userId + "/";
    let fetchConnection = db.ref(connectionWithUserId);

    fetchConnection.on("child_added", function (snapshot) {
        //console.log(snapshot);
        //console.log(snapshot.val());
        let item = snapshot.val();
        //check exist in list
        var check = dictConnections.get(item.connectionId);
        if (typeof (check) === "undefined" || check == null) {
            dictConnections.set(item.connectionId, item);
        }
        else
            $(`#${item.connectionId}`).remove();
        let eli = `<li id=${item.connectionId} class="list-group-item"
                    style="background-image: url('${item.avatar}');background-repeat: no-repeat;background-size: contain;text-align:center">
                    ${item.username}(${item.typeChat})<span class=${item.badge > 0 ? "badge" : "badgeHidden"} style="float: right;color:red">${item.badge}</span>
                    <span id='close'>x</span></li>`;
        $('#lst_conn').append(eli);
    });

    //fetch tempConnection
    let fetchTempConnection = db.ref(`${_formatRouteLogin}${chooseUser.userId}/${_prefixTempConnectionWithUserLogin}`)
    fetchTempConnection.on("child_added", function (snapshot) {
        let item = snapshot.key;
        if (typeof (item) !== "undefined" && item !== null) {
            if (typeof dictTempConnections[item] === 'undefined') {
                dictTempConnections.push(item);
            }
        }
    });
    //fetch busy call center
    initFetchCallCenterInfo(chooseUser.configNumber);
    //fetch listen notification
    initListenNotification(chooseUser.departmentId, chooseUser.userId);
}
else {
    chooseUser = user5;
    login();
    connectionWithUserId = _formatRouteConnection + chooseUser.userId + "/";
    let fetchConnection = db.ref(connectionWithUserId);

    fetchConnection.on("child_added", function (snapshot) {
        //console.log(snapshot);
        //console.log(snapshot.val());
        let item = snapshot.val();
        //check exist in list
        var check = dictConnections.get(item.connectionId);
        if (typeof (check) === "undefined" || check == null) {
            dictConnections.set(item.connectionId, item);
        }
        else
            $(`#${item.connectionId}`).remove();
        let eli = `<li id=${item.connectionId} class="list-group-item"
                    style="background-image: url('${item.avatar}');background-repeat: no-repeat;background-size: contain;text-align:center">
                    ${item.username}(${item.typeChat})<span class=${item.badge > 0 ? "badge" : "badgeHidden"} style="float: right;color:red">${item.badge}</span>
                    <span id='close'>x</span></li>`;
        $('#lst_conn').append(eli);
    });

    //fetch tempConnection
    let fetchTempConnection = db.ref(`${_formatRouteLogin}${chooseUser.userId}/${_prefixTempConnectionWithUserLogin}`)
    fetchTempConnection.on("child_added", function (snapshot) {
        let item = snapshot.key;
        if (typeof (item) !== "undefined" && item !== null) {
            if (typeof dictTempConnections[item] === 'undefined') {
                dictTempConnections.push(item);
            }
        }
    });
    //fetch busy call center
    initFetchCallCenterInfo(chooseUser.configNumber);
    //fetch listen notification
    initListenNotification(chooseUser.departmentId, chooseUser.userId);
}


//#region button
//Button login
$('#btn_Login').click(function () {
    if (typeof (chooseUser) !== "undefined" && chooseUser !== null) {
        db.ref(`${_formatRouteLogin}${chooseUser.userId}/${_prefixInfoWithUserLogin}`).set(chooseUser);
    }
});
//#endregion
//Button logout
$('#btn_logout').click(function () {
    clearAllStatusWhenLogout();
    clearAllTempConnectionWhenLogout(dictTempConnections);
    clearBusyCallCenter(chooseUser.configNumber, null);
    closeActiveCalling(chooseUser.configNumber);
    clearListenNotification(chooseUser.departmentId, chooseUser.userId);
    clearTempDeleteConnection(chooseUser.userId);
    let user = db.ref(_formatRouteLogin + chooseUser.userId);
    user.remove();
});

$('#sendButtonFw').click(function () {
    let messageFw = new MessageForward
        (
            "sendmsg", timestamp, "2659280042717887087", "1689397181570615473", "test", "fc142abd0909a456fd19",
            "nội dung tin nhắn firebase 1", "Tran Phat", "http://s120.avatar.talk.zdn.vn/f/6/7/c/10/120/b522d3d1f4f92091ddad3bd8f84f15bc.jpg",
            "ORIM", "Zalo"
        );
});

//Send to backward
let onThisObj = null;
$('#message-btn').click(function () {
    if (onThisObj != null) {
        var sendObj = new MessageBackward(
            onThisObj.typeChat,
            getTypeMessage(),
            onThisObj.appid,
            onThisObj.uid,
            chooseUser.userId,
            chooseUser.name,
            $('#message-input').val(),
            chooseUser.configNumber
        );
    }
    else {
        alert("null object selected");
        return;
    }
    $.ajax({
        type: "POST",
        url: getLink() + '/api/core/v1/chat/SendMessageBackward',
        data: JSON.stringify(sendObj),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            let name = chooseUser.name;
            if (data == 1) {
                let message = `<li id="li_mess" class=${"sent"
                    }><span>${name}: </span>${$('#message-input').val()}</li>`;
                // append the message on the page
                $('#messages').append(message);
            }
            else if (data == 2) {
                alert("Không thể gửi tin nhắn được. Người dùng đang được tổng đài viên khác phục vụ!");
            }
            else {
                alert(data);
            }
        },
        error: function (response) {
            alert(response);
        }
    });
});



//Show chat
let previousSeenConnection = "";
let previousGetMessageFromConnection = "";
$(document).on('click', '.list-group-item', function () {
    connectionId = $(this).attr("id");
    if (typeof (dictConnections.get(connectionId)) !== "undefined" && dictConnections.get(connectionId) !== null) {
        messageRoute = _formatRouteMessage + connectionId + "/" + chooseUser.userId + "/";
        //Update badge and seen
        if (previousSeenConnection !== "") {
            if (previousSeenConnection != connectionId) {
                updateSeen(connectionId, 1, 0);
                $(`#${connectionId} span`).remove(".badge");
                updateNotSeen(previousSeenConnection, 0);
                previousSeenConnection = connectionId;
            }
        }
        else {
            updateSeen(connectionId, 1, 0);
            $(`#${connectionId} span`).remove(".badge");
            previousSeenConnection = connectionId;
        }

        //#region fetch chat
        let timestamp = Date.now();
        let message = $('#message-input').val();
        let username = chooseUser.username;
        $('#message-input').val(''); //blank input message
        //set active
        $('.list-group-item').not(this).removeClass('list-group-item active').addClass('list-group-item')
        //$(".list-group-item active").removeClass('.list-group-item active').addClass('.list-group-item');
        $(this).removeClass('list-group-item').addClass('list-group-item active');

        onThisObj = dictConnections.get(connectionId);
        $('#messages').empty();
        //auto scroll to bottom
        $('#messages')[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        // reference the collection created earlier
        let fetchChat = db.ref(messageRoute);
        if (previousGetMessageFromConnection !== "") {
            if (previousGetMessageFromConnection !== messageRoute) {
                //stop listen
                let oldFetchChat = db.ref(previousGetMessageFromConnection);
                oldFetchChat.off("child_added");
            }
        }
        let listSnapshot = [];
        // check for new messages using the onChildAdded event listener
        fetchChat.on("child_added", function (snapshot) {
            //console.log(snapshot);
            //console.log(snapshot.key);
            //console.log(snapshot.val());
            let messages = snapshot.val();
            //let message = `<li id="li_mess" class=${username === messages.username ? "sent" : "receive"
            //    }><span>${username === messages.username ? chooseUser.name : messages.username}: </span>${messages.message}</li>`;
            //// append the message on the page
            //$('#messages').append(message);
            listSnapshot.push(messages);
        });
        getLogMessageBySupporter(onThisObj.typeChat, onThisObj.appid, onThisObj.uid, chooseUser.userId, 50, 0, listSnapshot);
        //getLogMessageBySupporter(onThisObj.typeChat, onThisObj.appid, onThisObj.uid, chooseUser.configNumber, 50, 0);
        previousGetMessageFromConnection = messageRoute;
        //#endregion
    }
});
//Close chat
$(document).on('click', '#close', function () {
    let connId = $(this).parent().attr('id');
    //clear temp connection
    //todo
    let item = dictConnections.get(connId);
    clearOneTempConnection(`${item.uid}_${item.appid}`);
    clearBusyCallCenter(chooseUser.configNumber, `${item.uid}_${item.appid}`);
    dictConnections.delete(connId);
    if (typeof (connId) !== "undefined" && connId !== null) {
        //delete connection
        var route1 = _formatRouteConnection + chooseUser.userId + "/" + connId;
        let fetchConn = db.ref(route1);
        fetchConn.remove();
        //delete message
        var route2 = _formatRouteMessage + connId + "/" + chooseUser.userId;
        //stop listen
        let fetchConnMess = db.ref(route2);
        let fetchListenMess = db.ref(route2 + "/");
        fetchListenMess.off("child_added");
        fetchConnMess.remove();
        if (previousSeenConnection === connId) {
            previousSeenConnection = "";
        }
        if (previousGetMessageFromConnection === route2 + "/") {
            previousGetMessageFromConnection = "";
        }
        this.parentNode.parentNode
            .removeChild(this.parentNode);
        $('#messages').empty();
    }
    return;
});
//#endregion

//click switch icon "notification" chat to get into chat page
$('#sp_newnotioffline').click(function () {
    clearNotificationChatOfflineOnclick(chooseUser.userId);
    //stop listen when go to chat page
    switchListenChatNotification("ChatPage", chooseUser.userId);
    $('#sp_newnotioffline').hide();
});

//#region browser off
$(window).bind("beforeunload", function () {
    clearAllStatusWhenLogout();
    clearAllTempConnectionWhenLogout(dictTempConnections);
    clearBusyCallCenter(chooseUser.configNumber, null);
    closeActiveCalling(chooseUser.configNumber);
    clearListenNotification(chooseUser.departmentId, chooseUser.userId);
    clearTempDeleteConnection(chooseUser.userId);
    let user = db.ref(_formatRouteLogin + chooseUser.userId);
    user.remove();
});
//#endregion

//#region function
function getTypeMessage() {
    var value = $('sct_typeMessage').val();
    switch (value) {
        default:
            return "Text";
    }
}

function updateSeen(connectionId, status, badge) {
    let connectionWithUserId = _formatRouteConnection + chooseUser.userId + "/"
    db.ref().child(connectionWithUserId + connectionId).update({
        'badge': badge,
        'status': status
    });
}
function updateNotSeen(connectionId, status) {
    let connectionWithUserId = _formatRouteConnection + chooseUser.userId + "/"
    db.ref().child(connectionWithUserId + connectionId).update({
        'status': status
    });
}
function clearAllStatusWhenLogout() {
    var formatConnectionRoute_WithUserId = _formatRouteConnection + chooseUser.userId + "/";
    var arrayKeys = Array.from(dictConnections.keys());
    if (arrayKeys.length > 0) {
        $.each(arrayKeys, function (index, value) {
            console.log(value);
            let fetchConnection = db.ref(formatConnectionRoute_WithUserId + value);
            fetchConnection.update({
                'badge': 0,
                'status': 0
            });
        });
    }
    dictConnections = new Map();
}

function getLogMessageBySupporter(apptype, appid, uid, supporterid, limit, offset, listSnapshot) {
    var object = {
        appid: appid,
        uid: uid,
        supporterid: supporterid,
        limit: limit,
        offset: offset
    };
    switch (apptype) {
        case zalo:
            $.ajax({
                type: "POST",
                //url: testPushLink + 'api/fb/v1/getDialog',
                url: 'https://orimx.vnptit.vn/kong/api/zalo/v2/getDialog',
                headers: {
                    "Authorization": "Basic " + "c21zdXNlcjpBUEkxMEBVc2VyITIy"
                },
                data: JSON.stringify(object),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.returnCode == 0) {
                        //$.each(data.returnData, function (index, value) {
                        //    let message = `<li id="li_mess" class=${value.messagetype == "MT" ? "sent" : "receive"
                        //        }><span>${value.messagetype == "MT" ? value.supportername : value.username}: </span>${value.message}</li>`;
                        //    // append the message on the page
                        //    $('#messages').append(message);
                        //});
                        var array = data.returnData;
                        for (let index = array.length - 1; index >= 0; index--) {
                            let message = `<li id="li_mess" class=${array[index].messagetype == "MT" ? "sent" : "receive"
                                }><span>${array[index].messagetype == "MT" ? array[index].supportername : array[index].username}: </span>${array[index].message}</li>`;
                            // append the message on the page
                            $('#messages').append(message);
                        };
                        let name = chooseUser.name;
                        if (listSnapshot.length > 0) {
                            $.each(listSnapshot, function (index, value) {
                                let message = `<li id="li_mess" class=${name === value.username ? "sent" : "receive"
                                    }><span>${name === value.username ? chooseUser.name : value.username}: </span>${value.message}</li>`;
                                // append the message on the page
                                $('#messages').append(message);
                            });
                        }
                    }
                    else {
                        alert("Get log error!");
                    }
                },
                error: function (response) {
                    alert(response);
                }
            });
            break;
        case facebook:
            $.ajax({
                type: "POST",
                //url: testPushLink + 'api/fb/v1/getDialog',
                url: 'https://orimx.vnptit.vn/kong/api/fb/v1/getDialog',
                data: JSON.stringify(object),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    let username = chooseUser.userName;
                    if (data.returnCode == 0) {
                        //$.each(data.returnData, function (index, value) {
                        //    let message = `<li id="li_mess" class=${value.messagetype == "MT" ? "sent" : "receive"
                        //        }><span>${value.messagetype == "MT" ? value.supportername : value.username}: </span>${value.message}</li>`;
                        //    // append the message on the page
                        //    $('#messages').append(message);
                        //});
                        var array = data.returnData;
                        for (let index = array.length - 1; index >= 0; index--) {
                            let message = `<li id="li_mess" class=${array[index].messagetype == "MT" ? "sent" : "receive"
                                }><span>${array[index].messagetype == "MT" ? array[index].supportername : array[index].username}: </span>${array[index].message}</li>`;
                            // append the message on the page
                            $('#messages').append(message);
                        };
                    }
                    else {
                        alert("Get log error!");
                    }
                },
                error: function (response) {
                    alert(response);
                }
            });
            break;
        default:
            //Hùng bổ sung call Live chat như tài liệu nhé
            break;
    }
}

//clear temp connection
function clearOneTempConnection(tempConnection) {
    if (typeof (dictTempConnections.find(x => x === tempConnection)) !== 'undefined' && dictTempConnections.find(x => x === tempConnection) !== null) {
        var routeTempConnection = `${_formatRouteTemporaryConnection}/${tempConnection}`;
        let fetchTempConnection = db.ref(routeTempConnection);
        fetchTempConnection.remove();
        var routeTempUserConnection = `${_formatRouteLogin}${chooseUser.userId}/${_prefixTempConnectionWithUserLogin}/${tempConnection}`;
        let fetchTempUserConnection = db.ref(routeTempUserConnection);
        fetchTempUserConnection.remove();
        var index = dictTempConnections.indexOf(tempConnection);
        dictTempConnections.splice(index, 1);
    }
    return;
}
function clearAllTempConnectionWhenLogout(tempCons) {
    $.each(tempCons, function (index, value) {
        var routeTempConnection = `${_formatRouteTemporaryConnection}/${value}`;
        let fetchTempConnection = db.ref(routeTempConnection);
        fetchTempConnection.remove();
    });
    tempCons = [];
    return;
}

function clearBusyCallCenter(configNumber, uid_appid) {
    let fetchBusyCallCenter;
    if (typeof (uid_appid) !== "undefined" && uid_appid !== null)
        fetchBusyCallCenter = db.ref(`${_formatRouteLogin}${_prefixCallCenterBusy}/${configNumber}/${uid_appid}`);
    else
        fetchBusyCallCenter = db.ref(`${_formatRouteLogin}${_prefixCallCenterBusy}/${configNumber}/`);
    fetchBusyCallCenter.remove();
}

function getLink() {
    var optLink = $('#sct_Env').val();
    switch (optLink) {
        case "op_dev":
            return devLink;
        case "op_demo":
            return demoLink;
        case "op_prod":
            return prodLink;
        default:
            return localLink;
    }
}

function login() {
    if (typeof (chooseUser) !== "undefined" && chooseUser !== null) {
        //Chat info login
        db.ref(`${_formatRouteLogin}${chooseUser.userId}/${_prefixInfoWithUserLogin}`).set(chooseUser);
        //fetch get new notification offline chat
        let routeNotificationChatOffline = `${_formatRouteNotiNewChat}${chooseUser.userId}`;
        fetchNotificationChatOfflineWhenLogin(routeNotificationChatOffline);
        //Fetch notification chat for offline
        fetchTempDeleteConnection(chooseUser.userId);
    }
}

function initFetchCallCenterInfo(agent) {
    let routeCallInfo = `${_formatRouteLogin}${_prefixCallCenterBusy}/${agent}/${_prefixCallInfo}/`;
    let fetchCallCenter = db.ref(routeCallInfo);
    fetchCallCenter.on("child_added", function (snapshot) {
        let item = snapshot.val();
        if (typeof (item) !== "undefined" && item !== null) {
            //console.log(item);
            let info = item.callerid + " is calling...";
            var result = confirm(info);
            if (result) {
                // the user clicked ok
                closeActiveCalling(agent);
            } else {
                // the user clicked cancel or closed the confirm dialog.
                closeActiveCalling(agent);
            }
        }
    });
}

function closeActiveCalling(agent) {
    let routeCallInfo = `${_formatRouteLogin}${_prefixCallCenterBusy}/${agent}/${_prefixCallInfo}/`;
    let fetchCallCenter = db.ref(routeCallInfo);
    fetchCallCenter.remove();
}

//notification
function initListenNotification(departmentId, officerId) {
    let defaultValue = { statuscode: 0, statusname: "active" };
    let routeStatusNotification = `${_formatRouteNotification}${departmentId}/${_prefixStatusNotification}/${officerId}/`;
    db.ref(`${routeStatusNotification}`).set(defaultValue);
    let routeListenNotification = `${_formatRouteNotification}${departmentId}/${officerId}/`;
    ListenNotification(routeListenNotification, officerId);
}
function ListenNotification(routeListenNotification, officerId) {
    //use with department
    let fetchListenNotification = db.ref(routeListenNotification);
    fetchListenNotification.on("child_added", function (snapshot) {
        let item = snapshot.val();
        console.log(item);
        if (typeof (item) !== "undefined" && item !== null) {
            let info = "Notification action name: " + item.message;
            var result = confirm(info);
        }
    });
    //use with direct officer
    let routeListenNotificationWithOfficer = `${_formatRouteNotification}${officerId}`;
    let fetchListenNotificationWithOfficer = db.ref(routeListenNotificationWithOfficer);
    fetchListenNotificationWithOfficer.on("child_added", function (snapshot) {
        let item = snapshot.val();
        console.log(item);
        if (typeof (item) !== "undefined" && item !== null) {
            let info = "Notification action name: " + item.message;
            var result = confirm(info);
        }
    });
}

function clearListenNotification(departmentId, officerId) {
    let routeListenNotification = `${_formatRouteNotification}${departmentId}/${officerId}`;
    let fetchListenNotification = db.ref(routeListenNotification);
    fetchListenNotification.remove();
    let routeStatusNotification = `${_formatRouteNotification}${departmentId}/${_prefixStatusNotification}/${officerId}/`;
    let fetchStatusNotification = db.ref(routeStatusNotification);
    fetchStatusNotification.remove();
}
//------------------------------

//offline chat flow
function fetchTempDeleteConnection(officerId) {
    let route = `${_formatRouteTempDeleteConnectionOfflineNotUse}${officerId}/${_prefixConnectionToDelete}`;
    let fetchData = db.ref(route);
    fetchData.on("child_added", function (snapshot) {
        let item = snapshot.val();
        console.log(item);
        if (typeof (item) !== "undefined" && item !== null) {
            //to do 
            //delete connection
            //Xóa trên giao diện và biến lưu trữ connectionId bị xóa
            $(`#${item}`).hide();
            $(`#${item}`).remove();
            dictTempConnections.splice($.inArray(item, dictTempConnections), 1);
        }
    });
}

function clearTempDeleteConnection(officerId) {
    let route = `${_formatRouteTempDeleteConnectionOfflineNotUse}${officerId}/${_prefixConnectionToDelete}`;
    let fetchData = db.ref(route);
    //fetchData.off("child_added");
    fetchData.remove();
}



function fetchNotificationChatOfflineWhenLogin(route) {
    let fetchData = db.ref(route);
    fetchData.on("child_added", function (snapshot) {
        let item = snapshot.val();
        console.log(item);
        if (typeof (item) !== "undefined" && item !== null) {
            $('#sp_newnotioffline').show();
            $("#sp_newnotioffline").pulsate({ color: "#09f" });
        }
    });
}

function clearNotificationChatOfflineOnclick(officerId) {
    let route = `${_formatRouteNotiNewChat}${officerId}`;
    let fetchData = db.ref(route);
    fetchData.remove();
}

// Sử dụng nếu ở 1 page khác page chat thì sẽ hiển thị notification trên icon khi có chat mới
function switchListenChatNotification(idTab, officerId) {
    var route = `${_formatRouteNotiNewChat}${officerId}`;
    let fetchData = db.ref(route)
    if (idTab === "ChatPage") {
        //stop listen chat notification
        //to do
        fetchData.off("child_added");
    }
    else {
        //start listen chat notification
        //to do
        fetchNotificationChatOfflineWhenLogin(route);
    }
}
//#endregion