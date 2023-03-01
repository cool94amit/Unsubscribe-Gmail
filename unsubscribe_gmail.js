function unsubscribeFromLabel() {
  // Find all emails with the label "Unsubscribe"
  var threads = GmailApp.search('label:Unsubscribe');

  // Unsubscribe from each email
  threads.forEach(function(thread) {
    try {
      // Open the email thread and click the "Unsubscribe" link
      var message = thread.getMessages()[0];
      var body = message.getBody();
      var unsubscribeUrl = extractUnsubscribeUrl(body);
      if (unsubscribeUrl) {
        UrlFetchApp.fetch(unsubscribeUrl);
      }
    } catch (e) {
      // Log any errors and continue to the next email
      Logger.log('Error: ' + e);
    }
  });
}

function extractUnsubscribeUrl(body) {
  // Find the "Unsubscribe" link in the email body
  var regex = /<a[^>]*href=["']([^"']*)["'][^>]*>Unsubscribe<\/a>/i;
  var match = body.match(regex);
  if (match) {
    return match[1];
  }
  return null;
}
