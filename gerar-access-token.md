## Como gerar access token no GitHub

Para obter um accessToken do GitHub, você precisa criar um token de acesso pessoal nas configurações da sua conta do GitHub.

Siga estas etapas para gerar um token de acesso:

1 - Faça login na sua conta do GitHub.

2 - Clique na sua foto de perfil no canto superior direito da página e selecione "Settings" (Configurações) no menu suspenso.

3 - Na página de configurações, clique em "Developer settings" (Configurações de desenvolvedor) no menu lateral esquerdo.

4 - No menu lateral esquerdo, clique em "Personal access tokens" (Tokens de acesso pessoal).

5 - Na página "Personal access tokens", clique no botão "Generate new token" (Gerar novo token).

6 - Será solicitado que você insira sua senha do GitHub para confirmar sua identidade.

7 - Em seguida, você será direcionado para a página de criação do token de acesso.

8 - Dê um nome descritivo ao seu token no campo "Note" (Nota).

9 - Selecione as permissões necessárias para o seu caso de uso. No seu caso, você precisará marcar a caixa "repo" para obter acesso aos repositórios.

10 - Role até o final da página e clique no botão "Generate token" (Gerar token).

11 - O token de acesso será gerado e exibido na página. Copie o token para uso posterior.

12 - Agora que você tem o seu token de acesso, substitua a variável de ambiente `ACCESS_TOKEN_GITHUB` no arquivo `.env`.

Lembre-se de que o token de acesso é sensível e confidencial, pois concede acesso aos seus repositórios e dados pessoais. Certifique-se de mantê-lo em local seguro e não compartilhe-o publicamente.