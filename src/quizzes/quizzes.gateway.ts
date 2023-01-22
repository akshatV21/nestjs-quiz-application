import { WebSocketGateway } from '@nestjs/websockets'

@WebSocketGateway({ namespace: 'quiz' })
export class QuizzesGateway {}
