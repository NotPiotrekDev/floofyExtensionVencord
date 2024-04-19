# floofyExtensionVencord
vewy floofy extension to vencord

### ❓ | Info
You need NodeJS installed

### 🤔 | Installation
Select folder where you want to install Vencord (in cmd and find it in file explorer)
Open Command Prompt and execute commands:
1. `npm i pnpm@8.10.2 -g`
2. `git clone https://github.com/Vendicated/Vencord`
3. `cd Vencord`
4. `pnpm install --frozen-lockfile`
5. Create folder `furryAddon` inside `Vencord/src` folder
6. Download and put `index.ts` and `settings.ts` inside `furryAddon` folder
7. Close discord
8. `pnpm build` (execute it inside Vencord folder, not src)
9. `pnpm inject` (If you have vencord installed already, select `Repair Vencord`, click enter and select option with `[PATCHED]` tag and click enter, If you dont have Vencord installed, select `Install Vencord`, select first option and click enter)


### 🤔 | Updating
1. Find folder `furryAddon` inside `Vencord/src` folder
2. Remove every file from there
3. Download `index.ts` and `settings.ts`
4. Put these files inside `furryAddon` folder
5. Close discord
6. Execute command `pnpm build` (inside Vencord folder from cmd)
7. Execute command `pnpm inject`, select `Repair Vencord`, click enter, select option with `[PATCHED]` tag and click enter.
8. Done
