from django.core.mail import EmailMultiAlternatives


def send_email(data):
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                font-family: 'Montserrat', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 0;
                background-color: #f5f5f5;
            }}
            .container {{
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                margin: 20px auto;
            }}
            .header {{
                background: linear-gradient(135deg, #D40078 0%, #6A00F4 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
                position: relative;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
                font-weight: 700;
            }}
            .icon {{
                font-size: 48px;
                margin-bottom: 15px;
                display: inline-block;
            }}
            .content {{
                padding: 25px;
            }}
            .ticket {{
                background: white;
                border: 1px solid #e0e0e0;
                border-radius: 6px;
                padding: 20px;
                margin: 20px 0;
                position: relative;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }}
            .ticket:before {{
                content: "";
                position: absolute;
                left: 10px;
                top: 0;
                bottom: 0;
                width: 4px;
                background: linear-gradient(to bottom, #D40078, #6A00F4);
                border-radius: 2px;
            }}
            .info-row {{
                margin-bottom: 12px;
                display: flex;
                align-items: center;
            }}
            .info-label {{
                font-weight: 600;
                color: #666;
                min-width: 80px;
            }}
            .message {{
                background: #f9f9f9;
                padding: 15px;
                border-radius: 4px;
                margin-top: 15px;
            }}
            .footer {{
                text-align: center;
                padding: 20px;
                color: #888;
                font-size: 12px;
                border-top: 1px solid #eee;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="icon">🚌</div>
                <h1>Ново запитване в RideOn</h1>
                <p>Вашият градски транспорт</p>
            </div>

            <div class="content">
                <p>Здравейте, екип на RideOn,</p>
                <p>Имате ново запитване от клиент:</p>

                <div class="ticket">
                    <div class="info-row">
                        <span class="info-label">Имена:</span>
                        <span><strong>{data['first_name']} {data['last_name']}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Имейл:</span>
                        <span>{data['email']}</span>
                    </div>

                    <div class="message">
                        <p><strong>Съобщение:</strong></p>
                        <p>{data['message']}</p>
                    </div>
                </div>
            </div>

            <div class="footer">
                <p>© 2025 RideOn - Вашето дигитално решение за градския транспорт</p>
            </div>
        </div>
    </body>
    </html>
    """

    text_content = f"""
    Ново запитване в RideOn
    ======================

    Имена: {data['first_name']} {data['last_name']}
    Имейл: {data['email']}
    Дата: {data.get('current_date', '')}

    Съобщение:
    {data['message']}

    © 2025 RideOn - Вашето дигитално решение за градския транспорт
    """

    email = EmailMultiAlternatives(
        subject=f"Ново запитване от {data['first_name']} {data['last_name']}",
        body=text_content,
        from_email='ride.on@yandex.com',
        to=['rideon.nbu@gmail.com'],
        reply_to=[data['email']]
    )
    email.attach_alternative(html_content, "text/html")
    email.send()
