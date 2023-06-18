import { OrgPublisher } from './domain/enterprise/events/orgs/org-publisher'
import { Server } from './infra/http/server'
import { Message } from './infra/message/message'

const server = new Server()
server.start()
const message = new Message()
OrgPublisher.instance().subscribe(message)
