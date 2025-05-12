// This script simulates sending email templates to users based on their sign-up date and activity stage.
// Mock variables for seller
let seller_sign_up_date = new Date('2025-04-15'); // Example sign-up date
let seller_stage = 1; 

// Mock variables for buyer
let buyer_sign_up_date = new Date('2025-04-20'); // Example sign-up date
let buyer_stage = 1;   

// Email template titles
const sellerTemplates = {
  welcome: "Almost There! Complete Your Sign-up in Minutes",
  reminder: "Don't Miss Out! Get Your Storefront Live Today",
  help: "Need Help? Let’s Get You Started!",
  live: "Let’s Get Your First Product Live!",
  reminder2: "Businesses Like Yours Are Thriving - Let’s Get You Started!"
};

const buyerTemplates = {
  waiting: "Forgot Something? Your Items Are Waiting! ", 
  reminder: "Still Thinking? We’re Here to Help! ",
  expire: "Last Chance! Your Cart is Expiring Soon",
};

/**
 * Checks if a specified number of days has passed since a date
 * @param {Date} date - The reference date
 * @param {number} days - Number of days to check
 * @returns {boolean} - True if at least the specified days have passed
 */
function daysPassed(date, days) {
  const now = new Date();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = Math.floor((now - date) / millisecondsPerDay);
  return dayDifference >= days;
}

/**
 * Simulates sending an email template to a user
 * @param {string} userType - "buyer" or "seller"
 * @param {string} templateName - The template name to send
 * @param {string} email - The email address to send to
 */
function sendEmailTemplate(userType, templateName, email) {
  const templates = userType === "seller" ? sellerTemplates : buyerTemplates;
  const template = templates[templateName];
  
  if (!template) {
    console.log(`Error: Template "${templateName}" not found for ${userType}`);
    return;
  }
  
  console.log(`Sending email to ${email} (${userType}):`);
  console.log(`Subject: ${template}`);
  console.log(`Sent at: ${new Date().toLocaleString()}`);
  console.log("---");
}

/**
 * Determines which email template to send based on user type, stage, and signup date
 * @param {string} userType - "buyer" or "seller"
 * @param {Date} signUpDate - The user's sign-up date
 * @param {number} stage - The user's activity level/stage
 * @param {string} email - The user's email address
 */
function checkAndSendEmailTemplate(userType, signUpDate, stage, email) {
  if (userType === "seller") {
    // Logic for sellers
    if (stage === 1) {
      // New seller who hasn't completed signup
      if (daysPassed(signUpDate, 0)) {
        sendEmailTemplate("seller", "welcome", email);
      }
      if (daysPassed(signUpDate, 3)) {
        sendEmailTemplate("seller", "reminder", email);
      }
    } else if (stage === 2) {
      // Completed signup but no listings
      if (daysPassed(signUpDate, 1)) {
        sendEmailTemplate("seller", "help", email);
      }
    } else if (stage === 3) {
      // Has listings but no sales
      if (daysPassed(signUpDate, 7)) {
        sendEmailTemplate("seller", "live", email);
      }
    } else if (stage === 4) {
      // Has made sales
      if (daysPassed(signUpDate, 14)) {
        sendEmailTemplate("seller", "reminder2", email);
      }
    }
  } else if (userType === "buyer") {
    // Logic for buyers
    if (stage === 1) {
      // New buyer who hasn't completed signup
      if (daysPassed(signUpDate, 0)) {
        sendEmailTemplate("buyer", "waiting", email);
      }
      if (daysPassed(signUpDate, 3)) {
        sendEmailTemplate("buyer", "reminder", email);
      }
    } else if (stage === 2) {
      // Completed signup but no views
      if (daysPassed(signUpDate, 2)) {
        sendEmailTemplate("buyer", "expire", email);
      }
    } 
  }
}

// Test the function with example users
function testEmailSender() {
  // Example seller
  checkAndSendEmailTemplate("seller", seller_sign_up_date, seller_stage, "seller@example.com");
  
  // Test seller in different stages
  console.log("Testing seller in different stages:");
  for (let stage = 1; stage <= 4; stage++) {
    console.log(`\nTesting seller at stage ${stage}:`);
    checkAndSendEmailTemplate("seller", seller_sign_up_date, stage, "seller@example.com");
  }
  
  // Example buyer
  console.log("\nTesting buyer:");
  checkAndSendEmailTemplate("buyer", buyer_sign_up_date, buyer_stage, "buyer@example.com");
  
  // Test buyer in different stages
  console.log("\nTesting buyer in different stages:");
  for (let stage = 1; stage <= 4; stage++) {
    console.log(`\nTesting buyer at stage ${stage}:`);
    checkAndSendEmailTemplate("buyer", buyer_sign_up_date, stage, "buyer@example.com");
  }
}

// Run the test
testEmailSender();