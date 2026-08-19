# Carreira 10

Aplicação full stack sobre a carreira de Lionel Messi. O frontend usa React, TypeScript, Vite e Tailwind CSS; a API usa FastAPI e SQLite.

## Estrutura

```text
messi-carreira/  # frontend
messi-backend/   # API e banco SQLite
```

Abra `messi-fullstack.code-workspace` no VS Code para trabalhar nas duas pastas juntas.

## Executar o projeto

No primeiro terminal:

```powershell
cd ..\messi-backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

No segundo terminal, dentro de `messi-carreira`:

```powershell
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://127.0.0.1:8000`
- Documentação: `http://127.0.0.1:8000/docs`
- Saúde da API: `http://127.0.0.1:8000/api/health`

## Configuração

O frontend lê a URL da API no arquivo `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```
