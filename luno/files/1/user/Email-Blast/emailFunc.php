<?php

include('mailerConfig.php');                                  

$mail->From = "campaign@advance.biz-tech-insights.com";
$mail->FromName = "Biz-Tech-Insights";

$mail->addAddress("asavalekar@kingstechmedia.com", "Akshay Savalekar");

$mail->isHTML(true);

$mail->Subject = "Subject Text Akshay Test Server";
$mail->Body = "<i>This is my final email</i>";
$mail->AltBody = "This is the plain text version of the email content";

try {
    $mail->send();
	// exit();
    // echo "Message has been sent successfully";
	// header('Location: https://www.google.com/');
	echo "<script>
	window.location.href = 'https://www.tutorialrepublic.com';
	</script>";
} catch (Exception $e) {
    // echo "Mailer Error: " . $mail->ErrorInfo;
}
