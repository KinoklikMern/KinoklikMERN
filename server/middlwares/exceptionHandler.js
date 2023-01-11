const respContent = (success,message,content) => {
    return {success:success,message:message,content:content}
 }
exceptionHandlder = async (err, req, res, next) => {
  console.log(err);
  res.status(410).send(respContent(false,err.message));
};

module.exports = exceptionHandlder;