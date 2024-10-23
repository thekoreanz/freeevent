import axios from 'axios';

export async function POST(req) {
  try {
    // Leer el cuerpo de la solicitud en formato URL-encoded
    const body = await req.text();  // Lee el cuerpo como texto plano
    const params = new URLSearchParams(body);  // Convierte el cuerpo a un objeto de búsqueda (key=value)

    // Determinar qué operación realizar
    const action = params.get('action'); // Espera un parámetro 'action' para decidir si es login o registro
    let url;

    if (action === 'register') {
      url = 'http://79.152.199.63/register.php';
    } else if (action === 'login') {
      url = 'http://79.152.199.63/login.php';
    } else {
      throw new Error('Invalid action'); // Manejar error si no se recibe acción válida
    }

    // Realizar la solicitud al servidor PHP
    const response = await axios({
      method: 'POST',
      url: url,
      data: body,  // Enviar los datos tal como vienen, ya están en formato URL-encoded
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
