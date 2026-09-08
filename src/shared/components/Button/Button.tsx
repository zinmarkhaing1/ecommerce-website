type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export function Button({ children, type = 'button', variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '8px',
        background: variant === 'primary' ? '#2563eb' : '#e5e7eb',
        color: variant === 'primary' ? '#fff' : '#111827',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
