import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  //listagem destinatários
  async index(res, req){
      const recipients = await Recipient.findAll();

      return res.json(recipients);
  };

  //exibir destinatários
  async show(res, req){
    const recipient = await Recipient.findByPk(req.params.id);

    if(!recipient){
      return res.status(400).json({ error: 'Recipient does not exists.' })
    }

    return res.json(recipient);
  }

  //cadastrar destinatários
  async store(req, res) {
    const schema= Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validadtion fails.' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  //alterar usuário
  async update(req, res){
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip: Yup.string()
  });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    };

    const recipient = await Recipient.findByPk(req.params.id);

    if(!recipient){
      return res.status(400).json({ error: 'This Recipient are not registred.' })
    }

    recipient.update(req.body);

    return res.json(recipient);
  };

  //deletar usuário
  async delete(req, res){
  const recipient =  await Recipient.findByPk(req.params.id);

  if(recipient){
    return res.status(400).json({ error: 'Recipient does not exists.' })
  };
  
  await recipient.destroy();

  return res.send();
};  
}

export default new RecipientController();