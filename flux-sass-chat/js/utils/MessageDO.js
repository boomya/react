/**
 * Created by jiangshan on 15/9/14.
 */
class MessageDO {
    constructor(id, threadId, threadName, text, date, isRead){
        this.id = id;
        this.threadId = threadId;
        this.threadName = threadName;
        this.text = text;
        this.date = date;
        this.isRead = isRead;
    }
}
module.exports = MessageDO;