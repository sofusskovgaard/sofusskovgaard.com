import { NextApiRequest, NextApiResponse } from "next";
import { ServerClient } from 'postmark'
import getConfig from "next/config"

export type RequestBody = {
  name: string
  email: string
  subject: string
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") return

  const body = JSON.parse(req.body)

  const errors: Error[] = []

  if (body.name == null || body.name.length == 0) {
    errors.push(new Error("name field is required."))
  }

  if (body.email == null || body.email.length == 0) {
    errors.push(new Error("email field is required."))
  }

  if (body.subject == null || body.subject.length == 0) {
    errors.push(new Error("subject field is required."))
  }

  if (body.message == null || body.message.length == 0) {
    errors.push(new Error("message field is required."))
  }

  if (errors.length == 0) {
    try {
      const model = {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
        timestamp: new Date().toISOString()
      }
      const serverRuntimeConfig = getConfig().serverRuntimeConfig
      const client = new ServerClient(serverRuntimeConfig.POSTMARK_APIKEY)
      const response = await client.sendEmailWithTemplate({
        From: 'no-reply@sofusskovgaard.com',
        To: 'privat@sofusskovgaard.com',
        TemplateId: 25231452,
        TemplateModel: model
      })
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({ success: false, errors: [err]})
    }

  } else {
    res.status(400).json({ success: false, errors: errors.map(err => err.message) })
  }
}
