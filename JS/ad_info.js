import { getAdById, getCategoryById, getUserById,
    updateAd, getCommentsForAd, addComment,
    getLikesOfAd, addLike, dislike,
    deleteComment } from "../Api/catch_adInfo.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("&");
const splitUrlFirst = splitUrl[0].split("=");
const user_id = Number(splitUrlFirst[1]);
const splitUrlSecond = splitUrl[1].split("=");
const ad_id = Number(splitUrlSecond[1]);

let ad;

async function loadPage() {
    ad = await getAdById(ad_id);
    loadAd();
    loadComments();
}

async function loadAd() {
    const category = await getCategoryById(ad.category_id);
    const user_name = await getUserById(ad.user_id);
    const likes = await getLikesOfAd(ad_id);
    document.getElementById("ad_title").innerHTML = ad.title;
    document.getElementById("ad_image").src = ad.image;
    document.getElementById("ad_description").innerHTML = ad.description;
    document.getElementById("ad_price").innerHTML = ad.price;
    let like = 0;
    for (let i = 0; i < likes.length; i++) {
        if(likes[i].user_id == user_id){
            document.getElementById("btnLike").checked = true;
        }
        like++
    }
    document.getElementById("ad_likes").innerHTML = like;
    document.getElementById("ad_category").innerHTML = category.name;
    document.getElementById("user").innerHTML = user_name.username;
}

document.getElementById("btnLike").addEventListener("click", async function() {
    let value = Number(document.getElementById("ad_likes").innerHTML);
    const likes = await getLikesOfAd(ad_id);
    if(document.getElementById("btnLike").checked == true) {
        value += 1;
        document.getElementById("ad_likes").innerHTML = value;
        await addLike(ad_id, user_id)
    } else {
        value -= 1;
        document.getElementById("ad_likes").innerHTML = value;
        
        for(let i = 0; i < likes.length; i++) {
            if(likes[i].user_id == user_id) {
                await dislike(likes[i].id);
            }
        }
    }
})

async function loadComments() {
    const comments = document.getElementById("comments");
    comments.innerHTML = "";
    const come = await getCommentsForAd(ad_id);
    for(let i = 0; i < come.length; i++) {
        const div = document.createElement("div");
        div.classList = "commentContainer";
        comments.appendChild(div);
        const name = document.createElement("h4");
        const user = await getUserById(come[i].userId);
        name.innerHTML = user.username;
        div.appendChild(name);
        const btnDel = document.createElement("button");
        btnDel.innerHTML = "X";
        btnDel.classList = "btnDel";
        btnDel.addEventListener("click", async function() {
            await deleteComment(come[i].id);
            loadComments();
        });
        div.appendChild(btnDel);
        const text = document.createElement("p");
        text.innerHTML = come[i].text;
        div.appendChild(text);
    }
}

document.getElementById("post_comment").addEventListener("click", async function() {
    const text = document.getElementById("commentText").value;
    await addComment(text, ad_id, user_id);
    loadComments();
    document.getElementById("commentText").value = "";
});

document.getElementById("btn_goBack").addEventListener("click", function() {
    window.open(`ads.html?id=${user_id}`, "_self");
});

window.addEventListener("load", loadPage);