import { humanLayerMessages } from './humanLayerMessages';

/** Auditable placement map: only existing actions; all humor is optional on touch. */
export const humanLayerPlacement = Object.values(humanLayerMessages).map(message => ({
  element: message.targetId,
  route: message.route,
  component: message.component,
  tone: message.tone,
  messageId: message.id,
  selectedMessage: message.defaultMessage,
  preferredPlacement: message.preferredPlacement,
  mobileBehavior: message.mobileBehavior,
}));
