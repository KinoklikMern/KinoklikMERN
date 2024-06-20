import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';

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
    return error.status;
  }
};

export const listSubscribers = async () => {
  try {
    const response = await mailchimp.lists.getListMembersInfo(audienceId, {
      count: 1000,
      offset: 0,
    });
    const subscribers = response.members.map((member) => ({
      email: member.email_address,
      status: member.status,
    }));

    console.info(subscribers);
    return subscribers;
  } catch (error) {
    const msg = JSON.parse(error.response.text);
    return { message: msg.detail };
  }
};

export const addSubscriber = async (
  email,
  firstName,
  lastName,
  receiveNewsletter
) => {
  try {
    const response = await mailchimp.lists.setListMember(
      audienceId,
      md5(email.toLowerCase()),
      {
        email_address: email,
        status_if_new: receiveNewsletter ? 'subscribed' : 'unsubscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }
    );
  } catch (error) {
    const msg = JSON.parse(error.response.text);
    return { message: msg.detail };
  }

  return { message: null };
};
