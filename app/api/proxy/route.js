import axios from 'axios';

export async function POST(req) {
  try {
    // Leer el cuerpo de la solicitud en formato URL-encoded
    const body = await req.text();  // Lee el cuerpo como texto plano
    const params = new URLSearchParams(body);  // Convierte el cuerpo a un objeto de búsqueda (key=value)

    // Extraer los valores
    const username = params.get('username');
    const email = params.get('email');
    const password = params.get('password');

    // Verifica los valores recibidos
    console.log('Parsed data:', { username, email, password });

    // Enviar la solicitud al servidor PHP
    const response = await axios({
      method: 'POST',
      url: 'http://79.152.199.63/register.php',
      data: body,  // Envía los datos tal como vienen, ya están en formato URL-encoded
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in POST /api/proxy:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
