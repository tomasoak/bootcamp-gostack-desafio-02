import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  //listagem destinatários
  async index(res, req){
      const allRecipient = await Recipient.findAll();

      if (!allRecipient){
        return res.status(400).json({ error: 'There are no Recipient registred.'});
      }
      return res.json(allRecipient);
  };

  //exibir destinatários
  async show(res, req){
    const { id } = req.params;

    const oneRecipient =  await Recipient.findOne(id);

    if(!oneRecipient){
      return res.status(400).json({ error: 'This Recipient are not registred.' })
    }

    return res.json(oneRecipient);
  }


  //cadastrar destinatários
  async store(req, res) {
    const schema= Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().integer().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validadtion fails.' });
      }
    
    const { name, state, city, zip } = req.body;

    const addressExist = await Recipient.findOne({ 
      where: { name, state, city, zip } 
    });  

    if(addressExist) {
      return res.status(401).json({ error: 'Adress already exist.' })
    }

    const { id, name, street, number, complement, state, city, zip } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip
    });

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

  const { id } = req.params;

  const oneRecipient =  await Recipient.findOne(id);

  if(!oneRecipient){
    return res.status(400).json({ error: 'This Recipient are not registred.' })
  }

  const { name, street, number, complement, state, city, zip } = await user.update(req.body);

      return res.json({
        name,
        street,
        number,
        complement,
        state,
        city,
        zip
      });
};

  //deletar usuário
  async delete(req, res){
  const { id } = req.params;

  const oneRecipient =  await Recipient.findOne(id);

  if(!oneRecipient){
    return res.status(400).json({ error: 'This Recipient are not registred.' })
  };
  
  oneRecipient.destroy({ where: { id }});

  return res.send();
};  
}

export default new RecipientController();