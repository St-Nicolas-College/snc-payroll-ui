export type ToastType = 'success' | 'error' | 'warning' | 'info'
export const useToast = () => {
  const show = useState('toast:show', () => false)
  const message = useState('toast:message', () => '')
  const color = useState('toast:color', () => 'success')
  const icon = useState('toast:icon', () => 'mdi-check-circle')

  const config: Record<ToastType, { color: string; icon: string }> ={
    success: {
      color: 'success',
      icon: 'mdi-check-circle'
    },
    error: {
      color: 'error',
      icon: 'mdi-alert-circle'
    },
    warning: {
      color: 'warning',
      icon: 'mdi-alert'
    },
    info: {
      color: 'info',
      icon: 'mdi-information'
    }
  }

  const triggerToast = (msg: string, type: ToastType = 'success') => {
    message.value = msg
    color.value = config[type].color
    icon.value = config[type].icon
    show.value = true
  }

  return {
    show,
    message,
    color,
    icon,
    triggerToast
  }
}