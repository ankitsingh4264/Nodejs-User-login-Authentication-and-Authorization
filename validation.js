
const joi=require('@hapi/joi');

//register validation

const registervalidation=(data)=>{
    const schema=joi.object({
        name:joi.string()
              .required()
              .min(4),
        email:joi.string()
               .min(6)
               .required()
               .email(),
        password:joi.string()
                .required()
                .min(4)
    });
    
    return schema.validate(data);
}
//login validation
const loginvalidation=(data)=>{
    const schema=joi.object({
       email:joi.string()
               .min(6)
               .required()
               .email(),
        password:joi.string()
                .required()
                .min(4)
    });
    
    return schema.validate(data);
}

module.exports.registervalidation=registervalidation;
module.exports.loginvalidation=loginvalidation;
