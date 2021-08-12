///Define classes
export default class User {
    constructor(userId, userName, departmentId, configNumber, calledQuantity, name) {
        this.userId = userId;
        this.userName = userName;
        this.departmentId = departmentId;
        this.configNumber = configNumber;
        this.calledQuantity = calledQuantity;
        this.name = name
    }
}

export class MessageBackward {
    constructor(
        appType, typeMessage, appid, uid, supporterid, supportername, message,
        imageUrl = '', imageTitle = '', imageDes = '', videoUrl = '', videoTitle = '',
        videoDes = '', videoThumb = '', linkUrl = '', linkTitle = '', linkDes = '',
        linkThumb = '', buttons = []
    ) {
        this.appType = appType;
        this.typeMessage = typeMessage;
        this.appid = appid;
        this.uid = uid;
        this.supporterid = supporterid;
        this.supportername = supportername;
        this.message = message;
        this.imageUrl = imageUrl;
        this.imageTitle = imageTitle;
        this.imageDes = imageDes;
        this.videoUrl = videoUrl;
        this.videoTitle = videoTitle;
        this.videoDes = videoDes;
        this.videoThumb = videoThumb;
        this.linkUrl = linkUrl;
        this.linkTitle = linkTitle;
        this.linkDes = linkDes;
        this.linkThumb = linkThumb;
        this.buttons = buttons;
    }
}

export class MessageForward {
    constructor(
        Event, timestamp, oaid, appid, uid, msgid, message, username, avatar, appname, type
    ) {
        this.Event = Event;
        this.timestamp = timestamp;
        this.oaid = oaid;
        this.appid = appid;
        this.uid = uid;
        this.msgid = msgid;
        this.message = message;
        this.username = username;
        this.avatar = avatar;
        this.appname = appname;
        this.type = type;
    }
}