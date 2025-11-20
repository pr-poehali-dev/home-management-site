CREATE TABLE IF NOT EXISTS t_p71212982_home_management_site.feedback (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'new',
    notes TEXT
);

CREATE INDEX idx_feedback_created_at ON t_p71212982_home_management_site.feedback(created_at DESC);
CREATE INDEX idx_feedback_status ON t_p71212982_home_management_site.feedback(status);

COMMENT ON TABLE t_p71212982_home_management_site.feedback IS 'Заявки с формы обратной связи';
COMMENT ON COLUMN t_p71212982_home_management_site.feedback.status IS 'Статус заявки: new, in_progress, resolved';
