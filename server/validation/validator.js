import Joi from "joi";
import JoiDate from '@joi/date';

const JoiExtended = Joi.extend(JoiDate);
const schema = JoiExtended.object({
    description: JoiExtended.string().required(),
    deadline: JoiExtended.date()
        .format('YYYY-MM-DD')
        .utc()
        .required()
});

export async function checkTask(req,res,next){
    try{
       await schema.validateAsync(req.body);
        next();
    }
    catch(err){
        const response  ={
            code : 400,
            message : err.details[0].message,
            data : req.body
        }
        res.status(response.code).json(response);
    }
}