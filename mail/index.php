<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
</head>

<body>

<div class="container">
         <h2 class="textb"></i>Email</h2> 
    <form class="login-form" method="post">
         <div class="inputok">
            <input type="email" placeholder="Saját email" required="" name="emailfrom" />
            <input type="email" placeholder="Cél email" required="" name="emailto" />
            <input type="text" placeholder="Tárgy" required="" name="targy" />
            <textarea type="text" name="message" placeholder="Üzenet"></textarea>
            <button class="but" type="submit" name="send">Send</button>
         </div>
                <?php
                if(isset ($_POST['send'],$_POST['emailto'],$_POST['emailfrom'])){
                    $mail = $_POST['emailfrom'];
                    $mailto = $_POST['emailto'];

                    $to = 'info@csuszydev.hu '. $mailto;
                    $subject = $_POST['targy'];
                    $message = $_POST['message']."\r\n[Az üzenetet küldte: $mail]";
                    $headers = 
                        'From: info@csuszydev.hu'."\r\n".
                        'Reply-To: info@csuszydev.hu'."\r\n".
                        'Content-Type: text/html; charset=UTF-8'.
                        'X-Mailer: PHP/' . phpversion();
                    if (mail($to, $subject, $message, $headers)){
                        echo '<h4 class="succes">Email sikeresen elküldve!</h4>';
                    }
                    else {
                     echo '<h4 class="error">Valami hiba van!</h4>';
                    }
                }
                ?>
    </form> 
</div>






</body>

</html>