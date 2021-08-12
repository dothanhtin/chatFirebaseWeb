$(document).ready(function () {

    //#region constant
    const zalo = "ZALO";
    const facebook = "FACEBOOK";
    const livechat = "LIVECHAT";


    //#endregion

    //#region init FCM

    //Cần tham số hóa và get config như mobile
    var firebaseConfig = {
        apiKey: "AIzaSyB4mzTxAplsmC37imEUy0yUQKDQEpKQNoE",
        authDomain: "web-push-1-2013d.firebaseapp.com",
        projectId: "web-push-1-2013d",
        storageBucket: "web-push-1-2013d.appspot.com",
        messagingSenderId: "907300725649",
        appId: "1:907300725649:web:a4cff1adf1481736cf7030",
        measurementId: "G-N83228LKL9"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    function InitializeFirebaseMessaging() {
        messaging.requestPermission()
            .then(function () {
                console.log("Notitfication Permission");
                return messaging.getToken();
            })
            .then(function (token) {
                localStorage.setItem("fcmToken", token);
                console.log("Token: " + token);
            })
            .catch(function (reason) {
                console.log(reason);
            });
    }

    function updateMessagingToken() {
        messaging.requestPermission()
            .then(function () {
                console.log("Notitfication Permission update");
                return messaging.getToken();
            })
            .then(function (newtoken) {
                localStorage.setItem("fcmToken", newtoken);
                console.log("new Token: " + newtoken);
            })
            .catch(function (reason) {
                console.log(reason);
            });
    }

    function deleteMessagingToken() {

        // Callback fired if Instance ID token is updated.
        messaging.deleteToken().then(function () {
            var key = localStorage.getItem("fcmToken");
            localStorage.removeItem(key);
            console.log('Token deleted!.');
        });
    }

    messaging.onMessage(function (payload) {
        //console.log(payload);
        var data = payload.data;
        console.log("on message: "+data);
        //let notificationInfo = {
        //    body: payload.notification
        //};

        ////Toast in browser
        //if (Notification.permission === "granted") {
        //    var notification = new Notification(payload.notification.title, notificationInfo);

        //    notification.onclick = function (ev) {
        //        ev.preventDefault();
        //        window.open(payload.notification.click_action, '_blank');
        //        notification.close();
        //    }
        //}
        ////---------------------------------------------------------------------------------------

        //append message
        var encodedMsg = data.username + " says: " + data.message;
        localStorage.setItem("zaloUid", data.uid);
        localStorage.setItem("appid", data.appid);

        const li = document.createElement("li");
        li.textContent = encodedMsg + ' ' + new Date();
        document.getElementById("messagesList").appendChild(li);
    });

    InitializeFirebaseMessaging();
    //#endregion

    //#region type object to send

    //#region Livechat

    //Text
    var textLiveChatobj = {
        appType: "LIVECHAT",
        typeMessage: "",
        appid: localStorage.getItem("appid"),
        uid: localStorage.getItem("zaloUid"),
        supporterid: localStorage.getItem("supporterid"),
        supportername: "Default",
        message: message,
        imageUrl: "",
        imageTitle: "",
        imageDes: "",
        videoUrl: "",
        videoTitle: "",
        videoDes: "",
        videoThumb: "",
        linkUrl: "",
        linkTitle: "",
        linkDes: "",
        linkThumb: "",
        buttons: []
    }
    //#endregion

    //#region Facebook

    //Text
    var textFacebookobj = {
        appType: "FACEBOOK",
        typeMessage: "Text",
        appid: "301082624172553",
        uid: "2827532807284177",
        supporterid: "Local/221@agents/n",
        supportername: "Default",
        message: "hello",
        imageUrl: "",
        imageTitle: "",
        imageDes: "",
        videoUrl: "",
        videoTitle: "",
        videoDes: "",
        videoThumb: "",
        linkUrl: "",
        linkTitle: "",
        linkDes: "",
        linkThumb: "",
        buttons: []
    }

    //#endregion

    //#region Zalo

    //Text
    var textZaloObj = {
        appType: "ZALO",
        typeMessage: "Text",
        appid: localStorage.getItem("appid"),
        //appid: "3837004637823339936",
        uid: localStorage.getItem("zaloUid"),
        //uid:"1668401301593382803",
        //uid: "2827532807284177",
        supporterid: "Local/222@agents/n",
        supportername: "Default",
        message: message,
        imageUrl: "",
        imageTitle: "",
        imageDes: "",
        videoUrl: "",
        videoTitle: "",
        videoDes: "",
        videoThumb: "",
        linkUrl: "",
        linkTitle: "",
        linkDes: "",
        linkThumb: "",
        buttons: []
    }

    //Photo
    var photoZaloObj = {
        appType: "ZALO",
        typeMessage: "ZaloPhoto",
        appid: localStorage.getItem("appid"),
        uid: localStorage.getItem("zaloUid"),
        supporterid: localStorage.getItem("supporterid"),
        supportername: "Default",
        message: "",
        imageUrl: "http://f7.photo.talk.zdn.vn/3514182034986952260/061a20c2402da573fc3c.jpg",
        imageTitle: "VNPT 4.0",
        imageDes: "Test gửi ảnh qua API",
        videoUrl: "",
        videoTitle: "",
        videoDes: "",
        videoThumb: "",
        linkUrl: "",
        linkTitle: "",
        linkDes: "",
        linkThumb: "",
        buttons: []
    }

    //Video
    var videoZaloObj = {
        appType: "ZALO",
        typeMessage: "ZaloVideo",
        appid: localStorage.getItem("appid"),
        uid: localStorage.getItem("zaloUid"),
        supporterid: localStorage.getItem("supporterid"),
        supportername: "Default",
        message: "",
        imageUrl: "",
        imageTitle: "",
        imageDes: "",
        videoUrl: "https://f4-zvc.zdn.vn/de37331a8f72662c3f63/4792746507320521936",
        videoTitle: "VNPT IT 2 - Một chiều mưa",
        videoDes: "Test gửi video qua API",
        videoThumb: "http://f16.photo.talk.zdn.vn/3560010979617812631/23214f1e5aecbfb2e6fd.jpg",
        linkUrl: "",
        linkTitle: "",
        linkDes: "",
        linkThumb: "",
        buttons: []
    }

    //Link
    var linkZaloObj = {
        appType: "ZALO",
        typeMessage: "ZaloLink",
        appid: localStorage.getItem("appid"),
        uid: localStorage.getItem("zaloUid"),
        supporterid: localStorage.getItem("supporterid"),
        supportername: "Default",
        message: "",
        imageUrl: "",
        imageTitle: "",
        imageDes: "",
        videoUrl: "",
        videoTitle: "",
        videoDes: "",
        videoThumb: "",
        linkUrl: "https://vnptit.vn",
        linkTitle: "vnptit.vn",
        linkDes: "Test gửi link qua API",
        linkThumb: "http://f7.photo.talk.zdn.vn/3514182034986952260/061a20c2402da573fc3c.jpg",
        buttons: []
    }

    //Button
    var buttonsZaloObj = {
        appType: "ZALO",
        typeMessage: "ZaloSendButton",
        appid: localStorage.getItem("appid"),
        uid: localStorage.getItem("zaloUid"),
        supporterid: localStorage.getItem("supporterid"),
        supportername: "Default",
        message: message,
        imageUrl: "",
        imageTitle: "",
        imageDes: "",
        videoUrl: "",
        videoTitle: "",
        videoDes: "",
        videoThumb: "",
        linkUrl: "",
        linkTitle: "",
        linkDes: "",
        linkThumb: "",
        buttons: [
            {
                "title": "Nút số 1",
                "payload": "#1"
            },
            {
                "title": "Nút số 2",
                "payload": "kiểm tra nút bấm"
            },
            {
                "title": "Nút số 3",
                "payload": "123456789"
            }
        ]
    }
    //#endregion

    //#endregion

    //#region link and environtment
    const prodLink = "https://orimx.vnptit.vn/kong";
    const demoLink = "https://orimx-demo.vnptit.vn/kong";
    const devLink = "https://orimx-dev.vdc2.com.vn/kong";
    //const localLink = "http://localhost:55567";
    const localLink = "http://localhost:55567"; //change with local test

    //#endregion

    //#region variable
    var environtment = $('sct_Env').val();
    var typeModuleChat = $('sct_moduleType').val();
    var typeMessageChat = $('sct_typeMessage').val();

    var message = $('messageInput').val();

    //#endregion

    //#region functions
    function getLink(env) {
        let link = "";
        switch (env) {
            case "op_prod":
                link = prodLink;
                break;
            case "op_demo":
                link = demoLink;
                break;
            case "op_dev":
                link = devLink;
                break;
            default:
                link = localLink;
                break;
        }
        return link;
    }

    function getModule(module) {
        switch (module) {
            case "op_zalo":
                return zalo;
            case "op_facebook":
                return facebook;
            default:
                return livechat;
        }
    }

    function getTypeMessageSend(typeMessage) {
        var opModuleVal = $('#sct_moduleType').val();
        //get module
        var module = getModule(opModuleVal);
        switch (module) {
            case zalo:
                switch (typeMessage) {
                    case "op_text":
                        return textZaloObj;
                    case "op_photo":
                        return photoZaloObj;
                    case "op_video":
                        return videoZaloObj;
                    case "op_link":
                        return linkZaloObj;
                    case "op_button":
                        return buttonsZaloObj;
                    default:
                        return null;
                }
                break;
            case facebook:
                switch (typeMessage) {
                    case "op_text":
                        return textFacebookobj;
                    default:
                        return null;
                }
                break;
            default:
                switch (typeMessage) {
                    case "op_text":
                        return textLiveChatobj;
                    default:
                        return null;
                }
        }

    }
    //#endregion

    //#region event
    $('#btn_updateFcmToken').click(function () {
        updateMessagingToken();
    });

    $('#btn_deleteFcmToken').click(function () {
        deleteMessagingToken();
    });


    //#endregion
})