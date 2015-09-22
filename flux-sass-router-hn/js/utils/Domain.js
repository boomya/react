/**
 * Created by jiangshan on 15/9/14.
 */
class UserDO {
    constructor(JSON){
        this.id = JSON.login;
        this.headUrl = JSON.avatar_url;
        this.homePage = JSON.html_url;
        this.userName = JSON.name;
        this.location = JSON.location;
        this.followers = JSON.followers;
        this.following = JSON.following;
    }
}
module.exports = {
    UserDO
};