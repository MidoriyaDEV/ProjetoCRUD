import React, { useState } from 'react';
import '../css/Dashboard.css';

const Dashboard = () => {
  // Estados do componente
  const [items, setItems] = useState([]); // Armazena a lista de itens
  const [filter, setFilter] = useState(''); // Armazena o texto do filtro
  const [modalMode, setModalMode] = useState(null); // Controla o modo do modal: 'add' ou 'edit'
  const [currentItem, setCurrentItem] = useState({ id: null, name: '', quantity: '' }); // Armazena o item atual sendo editado ou adicionado

  // Simulação do usuário logado
  const loggedUser = "Victor Nascimento";

  // Função para abrir o modal no modo de adição
  const openAddModal = () => {
    setCurrentItem({ id: null, name: '', quantity: '' }); // Reseta o item atual
    setModalMode('add'); // Define o modo do modal como 'add'
  };

  // Função para abrir o modal no modo de edição
  const openEditModal = (item) => {
    setCurrentItem(item); // Define o item atual como o item selecionado
    setModalMode('edit'); // Define o modo do modal como 'edit'
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalMode(null); // Fecha o modal
    setCurrentItem({ id: null, name: '', quantity: '' }); // Reseta o item atual
  };

  // Função para salvar o item (adicionar ou editar)
  const handleSave = () => {
    if (modalMode === 'add') {
      const newItem = { ...currentItem, id: Date.now() }; // Cria um novo item com um ID único
      setItems([...items, newItem]); // Adiciona o novo item à lista
    } else if (modalMode === 'edit') {
      setItems(items.map(item => item.id === currentItem.id ? currentItem : item)); // Atualiza o item existente
    }
    closeModal(); // Fecha o modal após salvar
  };

  // Função para excluir um item
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id)); // Remove o item da lista
  };

  // Filtra os itens com base no texto do filtro
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Cabeçalho com nome do usuário e botão de logout */}
      <header className="header">
        <h2>Bem-vindo, {loggedUser}</h2>
        <button className="logout-button" onClick={() => console.log("Logout")}>Logout</button>
      </header>

      {/* Área de ações: botão para cadastrar novo item e campo de filtro */}
      <div className="actions">
        <button onClick={openAddModal}>Cadastrar Novo Item</button>
        <input
          type="text"
          placeholder="Filtrar itens..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* Lista de itens */}
      <div className="item-list">
        {filteredItems.length === 0 ? (
          <p>Nenhum item cadastrado.</p> // Mensagem exibida quando não há itens
        ) : (
          <ul>
            {filteredItems.map(item => (
              <li className="item" key={item.id}>
                <div>
                  <strong>{item.name}</strong> - Quantidade: {item.quantity} {/* Exibe o nome e a quantidade do item */}
                </div>
                <div>
                  <button onClick={() => openEditModal(item)}>Editar</button> {/* Botão para editar o item */}
                  <button onClick={() => handleDelete(item.id)}>Excluir</button> {/* Botão para excluir o item */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal para adicionar ou editar um item */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{modalMode === 'add' ? 'Cadastrar Novo Item' : 'Editar Item'}</h3> {/* Título do modal */}
            <div style={{ marginBottom: '10px' }}>
              <label>Nome:</label>
              <input
                type="text"
                value={currentItem.name}
                onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })}
                className="input-full"
              />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label>Quantidade:</label>
              <input
                type="number"
                value={currentItem.quantity}
                onChange={e => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                className="input-full"
              />
            </div>
            <div className="modal-buttons">
              <button onClick={closeModal}>Cancelar</button> {/* Botão para cancelar */}
              <button onClick={handleSave}>Salvar</button> {/* Botão para salvar */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;