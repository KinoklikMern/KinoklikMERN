import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

mailchimp.setConfig({
  apiKey: "832da5f68dfb1dffc56e4efa573c85ea-us21",
  server: "us21",
});

export const addSubscribe = async (email, audienceId, firstName, lastName) => {
  const subscriberHash = md5(email.toLowerCase());

  // const response = await mailchimp.lists.getAllLists();
  // console.log(response);

  //category_id : "c8adb0efb2"
  //Interest id:
  //Filmmakers:97f73f639e
  //viewers: 99b675a9b3
  //ecosystem: 72158feb89
  //investors: bf0634a4ac
  //tech: 6733cda120
  //get all interest categories
  // const response = await mailchimp.lists.listInterestCategoryInterests(
  //   audienceId,
  //   "c8adb0efb2"
  // );
  // console.log(response);

  //addListMember with interest
  const response2 = await mailchimp.lists.addListMember(audienceId, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
    interests: {
      2706686037: false, //Tech
      "3bd82b23c8": true, //Filmmakers
      "0fb3916418": false,
      "7efa332ea9": false,
      cd45639efb: false,
    },
  });
  console.log(response2);
};
