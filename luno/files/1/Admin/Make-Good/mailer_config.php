<?php

require 'PHPMailer/PHPMailer.php';

require 'PHPMailer/SMTP.php';

require 'PHPMailer/Exception.php';



use PHPMailer\PHPMailer\PHPMailer;

use PHPMailer\PHPMailer\SMTP;

use PHPMailer\PHPMailer\Exception;







$mail = new PHPMailer(true);



//Enable SMTP debugging.

$mail->SMTPDebug = 3;                               

//Set PHPMailer to use SMTP.

$mail->isSMTP();            

//Set SMTP host name                          

$mail->Host = "mail.smtp2go.com";

//Set this to true if SMTP host requires authentication to send email

$mail->SMTPAuth = true;                          

//Provide username and password     

$mail->Username = "rachel@ithirings.com";                 

$mail->Password = "BN6T9YVCCyWz";                           

//If SMTP requires TLS encryption then set it

$mail->SMTPSecure = "tls";                           

//Set TCP port to connect to

$mail->Port = 587; 

?>