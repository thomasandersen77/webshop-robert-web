import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

const placeholder = 'Søk etter produkter';

type Props = {
  fullWidth?: boolean;
  size?: TextFieldProps['size'];
  /** `hero`: lys, hevet felt for mørk bakgrunn (f.eks. forsiden hero). */
  surface?: 'default' | 'hero';
  value?: string;
  onChange?: (value: string) => void;
  sx?: TextFieldProps['sx'];
};

export function SearchBar({
  fullWidth = true,
  size = 'small',
  surface = 'default',
  value,
  onChange,
  sx,
}: Props) {
  const isHero = surface === 'hero';
  return (
    <TextField
      placeholder={placeholder}
      aria-label={placeholder}
      size={size}
      fullWidth={fullWidth}
      {...(onChange != null
        ? {
            value: value ?? '',
            onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
          }
        : {})}
      sx={[
        {
          '& .MuiOutlinedInput-root': {
            borderRadius: 999,
            backgroundColor: isHero ? '#ffffff' : 'background.paper',
            boxShadow: isHero ? '0 12px 40px rgba(0, 0, 0, 0.2)' : undefined,
            transition: 'box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: isHero ? '0 14px 44px rgba(0, 0, 0, 0.24)' : undefined,
            },
            '&.Mui-focused': {
              boxShadow: isHero ? '0 16px 48px rgba(0, 0, 0, 0.28)' : undefined,
            },
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{ color: isHero ? 'primary.main' : undefined }}
                color={isHero ? undefined : 'action'}
                fontSize={size === 'medium' ? 'medium' : 'small'}
              />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
