// 홈으로 이동
document.getElementById("gohome").addEventListener("click", function () {
  window.location.href = "index.html";
});

async function getPost() {
  try {
    // 게시글 정보
    // console.log(postId);
    const postResponse = await axios.get(`/api/post/${postId}`);

    const user = postResponse.data.data.User;

    const writer = userInfo.data.data.userProfile;

    const userEmail = user.email;

    const writerEmail = writer.email;

    const post = postResponse.data.data;

    // 게시글 정보
    document.querySelector("#category").innerHTML =
      categoryMapping[post.categoryName];
    document.querySelector("#title").innerHTML = post.title;
    document.querySelector("#content").innerHTML = post.content;

    const isoDataString = post.createdAt;
    const date = new Date(isoDataString);
    const formattedDate = date.toLocaleString();
    document.querySelector("#created-at").innerHTML = formattedDate;

    //작성자 정보
    document.querySelector("#writer").innerHTML = user.username;
    const writerImage = document.querySelector("#writer-img");
    writerImage.src = user.profilePictureUrl;
    writerImage.style.width = "80%"; // 예시: 너비 300px
    writerImage.style.diplay = "flex"; // 예시: 너비 300px

    // 사용자 정보
    document.querySelector("#commenter-me").innerHTML = user.username;
    const userImage = document.querySelector("#commenter-me-img");
    userImage.src = user.profilePictureUrl;
    userImage.style.width = "80%"; // 예시: 너비 300px
    userImage.style.diplay = "flex"; // 예시

    // 수정
    document.getElementById("post-edit").addEventListener("click", function () {
      if (userEmail !== writerEmail) {
        return alert("해당 글의 작성자만 수정 권한이 있습니다.");
      }
      const editBox = $(".edit-box-outer");
      editBox.show();

      const category = $("#categorySelect").val(post.categoryName);

      const title = $("#postTitle").val(post.title);

      const content = $("#edit-content").val(post.content);

      document
        .getElementById("sendButton2")
        .addEventListener("click", async function () {
          try {
            if (!category.val() || !title.val() || !content.val()) {
              return alert("값을 모두 입력하셔야 수정이 가능합니다");
            }

            $("#sendButton2").click(async function () {
              await axios.put(`/api/post/${postId}`, {
                categoryName: category.val(),
                title: title.val(),
                content: content.val(),
              });
              location.reload();
            });
          } catch (error) {
            console.log(error);
          }
        });
    });

    // 삭제
    document
      .querySelector("#post-del")
      .addEventListener("click", async function () {
        try {
          if (userEmail !== writerEmail) {
            return alert("해당 글의 작성자만 수정 권한이 있습니다.");
          }
          // let check = prompt('정말로 삭제하시겠습니까? "삭제는 Y/ 취소는 N" 를 입력해주세요');
          // if (check === "Y".toLowerCase() || check !== "N".toLowerCase()) {
          //   return alert("삭제를 취소하셨습니다. ");
          // }
          axios.delete("/api/post/:postId");
          alert("삭제 완료!");
          window.location.href = "index.html";
        } catch (error) {
          console.error(error);
        }
      });
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
}

getPost();
