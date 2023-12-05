import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

export const searchMember = async (email) => {
  try {
    const response = await mailchimp.lists.getListMember(
      audienceId,
      md5(email.toLowerCase())
    );

    return response.status;
  } catch (error) {
    //console.log("searchMember Error: " + msg.detail);
    return error.status;
  }
};

export const listSubscribers = async () => {
  try {
    const response = await mailchimp.lists.getListMembersInfo(audienceId, {
      count: 1000,
      offset: 0,
    });
    //extract email and status from response
    const subscribers = response.members.map((member) => {
      return {
        email: member.email_address,
        status: member.status,
        interests: member.interests,
      };
    });

    console.info(subscribers);
    return subscribers;
  } catch (error) {
    const msg = JSON.parse(error.response.text);
    //console.log("AddSubscriber Error: " + msg.detail);
    return { message: msg.detail };
  }
};
export const addSubscriber = async (
  email,
  firstName,
  lastName,
  newsLetterOptions
) => {
  try {
    //Set basic info to test email is valid or not, update interest later to reduce response time

    const response = await mailchimp.lists.setListMember(
      audienceId,
      md5(email.toLowerCase()),
      {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }
    );

    //Update interest and status
    updateMembersInterest(email, newsLetterOptions);
    //console.log(listSubscribers());//for testing
  } catch (error) {
    const msg = JSON.parse(error.response.text);
    //console.log("AddSubscriber Error: " + msg.detail);

    return { message: msg.detail };
  }

  return { message: null };
};

const updateMembersInterest = (email, newsLetterOptions) => {
  getAllLists()
    .then((res) => {
      const interestMap = res;
      //Construct interest object
      const interest = {};
      //init all interest to false
      Object.keys(interestMap).forEach((key) => {
        interest[interestMap[key]] = false;
      });
      newsLetterOptions.forEach((option) => {
        interest[interestMap[option]] = true;
      });

      //console.log(interest);
      searchMember(email).then((status) => {
        if (status === "unsubscribed" || status === "cleaned") {
          //trigger sending confirmation email to user for resubscribing
          mailchimp.lists
            .updateListMember(audienceId, md5(email.toLowerCase()), {
              email_address: email,
              status: "pending",
              interests: interest,
            })
            .then((res) => {})
            .catch((err) => {
              console.log("TriggerConfirmError: " + err);
            });
        } else {
          mailchimp.lists
            .updateListMember(audienceId, md5(email.toLowerCase()), {
              email_address: email,
              status: "subscribed",
              interests: interest,
            })
            .catch((err) => {
              console.log("SetSubscribedError: " + err);
            });
        }
      });
    })
    .catch((err) => {
      console.log("Get Lists Info Error: " + err);
    });
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
  //Find the interest category by name
  const foundGroup = response1.categories.find(
    (item) => item.title === "KinoKlik EPK Newsletter Subscription"
  ); //Title is created in mailchimp,
  //console.log(foundGroup); //must be sure this group exists, if not, here foundGroup will be undefined

  //get all interest categories
  const response2 = await mailchimp.lists.listInterestCategoryInterests(
    audienceId,
    foundGroup.id
  );
  const groups = response2.interests;
  //console.log(groups);

  //generate interest map based on interest categories
  const interestMap = {};
  groups.forEach((group) => {
    switch (group.name) {
      case "Actors":
        interestMap["actors"] = group.id;
        break;
      case "Viewers":
        interestMap["viewers"] = group.id;
        break;
      case "Film Industry":
        interestMap["ecosystem"] = group.id;
        break;
      case "Investors":
        interestMap["investors"] = group.id;
        break;
      case "KinoKlik General":
        interestMap["general"] = group.id;
        break;
      default:
        interestMap["filmmakers"] = group.id; //"Filmmakers"
        break;
    }
  });

  return interestMap;
};
