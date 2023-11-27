import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

export const searchMember = async (email) => {
  try {
    const response2 = await mailchimp.searchMembers.search(
      `email_address:${email}`
    );

    const result = response2.full_search.total_items;
    if (response2.full_search.total_items > 0) {
      //Email exists
      if (response2.full_search.members.status === "subscribed") {
        return 1; //email exists and subscribed
      } else {
        return 2; //email exists but not subscribed
      }
    } else {
      return 0; //email does not exist
    }
  } catch (error) {
    //const msg = JSON.parse(error.response.text);

    return error.response.text;
  }
};

export const addSubscriber = async (
  email,
  firstName,
  lastName,
  newsLetterOptions
) => {
  const interestMap = await getAllLists(); //get interest map,keys' first letters are Capitalize

  //Construct interest object
  //newsLetterOptions = ["Filmmakers","Viewers","Ecosystem","Investors","Tech"]
  const interest = {};
  //init all interest to false
  Object.keys(interestMap).forEach((key) => {
    interest[interestMap[key]] = false;
  });
  newsLetterOptions.forEach((option) => {
    interest[interestMap[option]] = true;
  });

  try {
    const flag = await searchMember(email);

    if (flag === 0) {
      //addListMember with interest
      const response2 = await mailchimp.lists.addListMember(audienceId, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        interests: interest,
      });
    } else {
      //updateListMember with interest , And add email to subscriber
      const response2 = await mailchimp.lists.updateListMember(
        audienceId,
        md5(email.toLowerCase()),
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
          interests: interest,
        }
      );
    }
  } catch (error) {
    const msg = JSON.parse(error.response.text);
    //console.log("AddSubscriber Error: " + msg.detail);
    return { message: msg.detail };
  }

  return { message: null };
};

//Get interest group's name and id
export const getAllLists = async () => {
  //get all lists(Audience list info)
  // const response = await mailchimp.lists.getAllLists();
  // console.log(response);

  // //get audience id,Can be specified directly using environment variables
  // const lists = response.lists;
  // const audienceId = lists.filter((list) => {
  //   if (list.name === "wet") {
  //     //"wet" is the name of the audience list for testing
  //     return list.id;
  //   }
  // });
  // console.log(audienceId);

  //get all interest categories
  const response1 = await mailchimp.lists.getListInterestCategories(audienceId);
  const categories = response1.categories[0];
  //console.log(categories);

  //get all interest categories
  const response2 = await mailchimp.lists.listInterestCategoryInterests(
    audienceId,
    categories.id
  );
  const groups = response2.interests;
  //console.log(groups);

  //generate interest map based on interest categories
  const interestMap = {};
  groups.forEach((group) => {
    interestMap[group.name.toLowerCase()] = group.id;
  });

  return interestMap;
};
