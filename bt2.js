<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            section {
                display: flex;
                justify-content: center;
                height: 100%;
            }
            .container {
                display: flex;
                width: 60rem;
                height: 30rem;
                margin: auto;
                background: lightblue;
            }
            .input-data {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                padding: 2em;
                border-radius: 7%;
            }
            input[type="submit"],
            input[type="reset"] {
                width: 5rem;
                padding: .6em 0;
            }
            form > *,
            content > * {
                padding-bottom: 1em;
            }
            .flex {
                display: flex;
            }
            .gender > * {
                padding-left: 2em;
            }
            .hobby {
                flex-direction: column;
            }
            .hobby > * {
                padding-left: 2em;
                padding-bottom: .5em;
            }
            .button {
                padding: 0;
              
            }
            .button input {
                border-radius: 7px;
                
            }
            .output-data {
                display: flex;
                align-items: center;
                width: 100%;
                background:blue;
                border-radius:;
            }
            .content > * {
                padding-left: 2em;
                padding-bottom: 1em;
            }
            @media (max-width: 60rem) {
                .container {
                    flex-direction: column;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 15rem;
                }
            }
        </style>
    </head>
    <body>
        <section>
            <div class="container">
                <div class="input-data">
                    <form id="user-detail">

                        <div class="name">
                            <label for="name">Tên : </label>
                            <input type="text" id="user-name">
                        </div>
                        <div class="email">
                            <label for="name">Email:</label>
                            <input type="text" id="user-email">
                        </div>

                        <label for="gender">Giới Tính:</label>
                        <div class="flex gender">
                            <div class="male">
                                <input type="radio" name="gender" value="Male" id="user-gender">
                                <label for="male">Nam</label>
</div>
                            <div class="female">
                                <input type="radio" name="gender" value="Female" id="user-gender">
                                <label for="female">Nữ</label>
                            </div>
                        </div>

                        <div class="nation">
                            <label for="nation">Quốc tịch:</label>
                            <select name="nationality" id="user-nation">
                                <option>Vietnam</option>
                                <option>Spain</option>
                                <option>America (USA)</option>
                                <option>Germany</option>
                                <option>England</option>
                            </select>
                        </div>

                        <label for="hobby">Sở thích</label>
                        <div class="flex hobby">
                            <div class="coding">
                                <input type="checkbox" name="hobby" value="Coding">
                                <label for="coding">Đá Bóng</label>
                            </div>
                            <div class="travel">
                                <input type="checkbox" name="hobby" value="Travel">
                                <label for="travel">Lập Trình</label>
                            </div>
                        </div>

                        <div class="button">
                            <input type="submit" value="Submit" id="submit">
                            <input type="reset">
                        </div>
                    </form>
                </div>

                <div class="output-data">
                    <div class="content">
                        <p class="content-name">Tên:</p>
                        <p class="content-email">Email:</p>
                        <p class="content-gender">Giới tính:</p>
                        <p class="content-nation">Quốc tịch:</p>
                        <p class="content-hobby">Sở thích:</p>
                    </div>
                </div>

            </div>
        </section>
        
    </body>
    <script>
        const form = document.getElementById('user-detail').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('user-name').value;
            document.querySelector('.content-name').textContent = Name: ${name};

            const email = document.getElementById('user-email').value;
            document.querySelector('.content-email').textContent = Email: ${email};

            const genders = document.getElementsByName('gender');
            genders.forEach(gender => {
                if (gender.checked == true) {
                    document.querySelector('.content-gender').textContent = Gender: ${gender.value};
                };
            });
const nation = document.getElementById('user-nation').value;
            document.querySelector('.content-nation').textContent = Nationality: ${nation};

            const hobbies = document.getElementsByName('hobby');
            hobbyArray = [];
            hobbies.forEach(hobby => {
                if (hobby.checked == true) {
                    hobbyArray.push(hobby.value);
                };
            });
            document.querySelector('.content-hobby').textContent = Hobby: ${hobbyArray.join(', ')};
        });
    </script>
</html>
