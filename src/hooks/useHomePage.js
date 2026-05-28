import { useState } from "react";
import { useContatos } from "./useContatos";

export function useHomePage() {
  const { contatos, adicionarContato, editarContato, deletarContato } = useContatos();

  const [aberto, setAberto] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [contatoEditando, setContatoEditando] = useState(null);

  const toggleMenu = () => setAberto((prev) => !prev);

  const handleToggleExpand = (index) => {
    setExpandedIndex((atual) => (atual === index ? null : index));
  };

  const abrirModalNovo = () => {
    setContatoEditando(null);
    setMostrarModal(true);
    setAberto(false);
  };

  const abrirModalEditar = (contato) => {
    setContatoEditando(contato);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setContatoEditando(null);
  };

  const salvarContato = async ({ nome, telefone }) => {
    try {
      if (contatoEditando) {
        await editarContato(contatoEditando.id, { nome, telefone });
      } else {
        await adicionarContato({ nome, telefone });
      }
    } catch (err) {
      console.error("Erro ao salvar contato:", err);
    } finally {
      fecharModal();
    }
  };

  const handleDeletarContato = async (id) => {
    try {
      await deletarContato(id);
      setExpandedIndex(null);
    } catch (err) {
      console.error("Erro ao deletar contato:", err);
    }
  };

  return {
    contatos,
    aberto,
    toggleMenu,
    mostrarModal,
    abrirModalNovo,
    abrirModalEditar,
    fecharModal,
    expandedIndex,
    handleToggleExpand,
    salvarContato,
    handleDeletarContato,
    contatoEditando,
  };
}
