<div align="center">

# 📡 WATCHDOG-CLOUD
### Plateforme Distribuée de Monitoring & Alerting Temps Réel (TypeScript • BullMQ • Redis • Socket.IO)

<img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/BullMQ-Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
<img src="https://img.shields.io/badge/Alerts-Discord_%26_Telegram-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Alerts" />

</div>

---

## ✨ Fonctionnalités
* **Workers distribués (BullMQ + Redis)** exécutant les contrôles HTTP de façon concurrente et résiliente.
* **Diffusion temps réel via WebSockets (`Socket.IO`)** vers n'importe quel dashboard client.
* **Alerting multi-canaux** instantané sur **Discord (Webhooks)** et **Telegram (Bot API)** dès qu'un service tombe.
* **Validation stricte (`Zod`)**, tests `Vitest`, `docker-compose.yml` et CI GitHub Actions.

## 🚀 Lancement
```bash
git clone https://github.com/whynotzr/watchdog-cloud.git
cd watchdog-cloud
cp .env.example .env
docker compose up --build
```
