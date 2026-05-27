# Deployment Notes

## Production

- Production URL: https://guitar-design-configurator-pz9saibi8-635-jl-s-projects.vercel.app
- GitHub repository: https://github.com/635jm/guitar-design-configurator.git
- Deployment platform: Vercel
- Current stable commit: `a272e9ccc440d7a583421713124f095efc238af5`

## Local Verification

Local verification passed on the Hong Kong computer:

```powershell
npm.cmd install
npm.cmd run lint
npm.cmd run build
```

## Next Recommended QA Checklist

- Open the production URL and confirm the dashboard loads.
- Confirm the localStorage notice is visible.
- Create a project from a starter preset.
- Configure guitar options and confirm the preview updates.
- Save, refresh, and confirm project persistence works.
- Open the summary page for the saved project.
- Test Copy Summary, Download TXT, and Copy Prompt or their fallbacks.
- Test Export All JSON from the dashboard.
- Test Export Project JSON from the summary page.
- Duplicate and delete a project.
- Open a fake project URL and confirm the Project not found state appears.
