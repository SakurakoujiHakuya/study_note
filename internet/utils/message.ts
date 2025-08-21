import { message } from 'ant-design-vue';

type MessageType = 'success' | 'error' | 'warning' | 'info';

export function showMessage(
  content: string,
  type: MessageType = 'error',
  duration: number = 3
) {
  message.destroy();
  message[type]({
    content,
    duration,
    maxCount: 1
  });
}